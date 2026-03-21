import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/stripe/debug-payment?session_id=xxx
 *
 * Endpoint de diagnostic — NE modifie rien.
 * Retourne l'état complet pour comprendre pourquoi has_paid reste false.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  // 1. Auth Supabase
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  const result: Record<string, unknown> = {
    auth: {
      authenticated: !!user,
      user_id: user?.id ?? null,
      auth_error: authError?.message ?? null,
    },
  };

  // 2. Profil en DB
  if (user) {
    const admin = createAdminClient();
    const { data: profile, error: profileError } = await admin
      .from("profiles")
      .select("id, has_paid, plan, stripe_customer_id, stripe_subscription_id, email_sequence, is_guest")
      .eq("id", user.id)
      .single();

    result.profile = {
      found: !!profile,
      data: profile ?? null,
      error: profileError?.message ?? null,
    };

    // 3. Variables d'env Stripe (masquées)
    result.env = {
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
        ? `${process.env.STRIPE_SECRET_KEY.slice(0, 7)}...${process.env.STRIPE_SECRET_KEY.slice(-4)}`
        : "MANQUANT",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
        ? `${process.env.SUPABASE_SERVICE_ROLE_KEY.slice(0, 10)}...`
        : "MANQUANT",
      STRIPE_PRICE_ID_SOLO: process.env.STRIPE_PRICE_ID_SOLO ?? "MANQUANT",
      STRIPE_PRICE_ID_PRO: process.env.STRIPE_PRICE_ID_PRO ?? "MANQUANT",
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ? "défini" : "MANQUANT",
    };

    // 4. Session Stripe si fournie
    if (sessionId) {
      try {
        const session = await getStripe().checkout.sessions.retrieve(sessionId, {
          expand: ["subscription", "customer"],
        });

        const subId =
          typeof session.subscription === "string"
            ? session.subscription
            : (session.subscription as { id?: string } | null)?.id ?? null;

        let subStatus: string | null = null;
        if (subId) {
          try {
            const sub = await getStripe().subscriptions.retrieve(subId);
            subStatus = sub.status;
          } catch {
            subStatus = "erreur récupération";
          }
        }

        result.stripe_session = {
          id: session.id,
          payment_status: session.payment_status,
          status: session.status,
          client_reference_id: session.client_reference_id,
          client_reference_id_matches_user: session.client_reference_id === user.id,
          metadata: session.metadata,
          subscription_id: subId,
          subscription_status: subStatus,
          customer_id:
            typeof session.customer === "string"
              ? session.customer
              : (session.customer as { id?: string } | null)?.id ?? null,
        };
      } catch (err) {
        result.stripe_session = {
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }
  }

  return NextResponse.json(result, { status: 200 });
}
