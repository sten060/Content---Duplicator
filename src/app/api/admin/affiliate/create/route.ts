import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

/**
 * Crée un affilié "avec code promo" en DB et génère automatiquement un coupon
 * Stripe en % sur le 1er paiement, ainsi qu'un Stripe Promotion Code visible.
 *
 * Auth : le JWT de l'utilisateur est attendu dans le header Authorization.
 */
export async function POST(req: NextRequest) {
  const admin = createAdminClient();

  // Vérification via Bearer token (plus fiable que les cookies depuis un Client Component)
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { data: { user }, error: authError } = await admin.auth.getUser(token);
  if (authError || !user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId || user.id !== adminUserId.trim()) {
    return NextResponse.json({ error: "Interdit" }, { status: 403 });
  }

  const { code, name, email, commission_pct, discount_pct } = await req.json();
  if (!code || typeof code !== "string" || !name || typeof name !== "string") {
    return NextResponse.json({ error: "code et name requis" }, { status: 400 });
  }

  const upperCode = code.trim().toUpperCase();
  const commissionPct = typeof commission_pct === "number" ? commission_pct : 20;
  const discountPct = typeof discount_pct === "number" ? discount_pct : 20;

  const stripe = getStripe();

  // ── 1. Créer un coupon Stripe en % (unique par partenaire) ────────────────
  const coupon = await stripe.coupons.create({
    percent_off: discountPct,
    duration: "once",
    name: `DuupFlow Partenaire ${upperCode} -${discountPct}%`,
    metadata: { duupflow_partner: "true", affiliate_code: upperCode },
  });

  // ── 2. Créer le Stripe Promotion Code (visible, utilisable manuellement) ──
  let stripePromoCodeId: string;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const promoCode = await (stripe.promotionCodes.create as any)({
      coupon: coupon.id,
      code: upperCode,
      restrictions: { first_time_transaction: true },
      metadata: { affiliate_code: upperCode },
    });
    stripePromoCodeId = promoCode.id;
  } catch (err: any) {
    if (err?.code === "resource_already_exists") {
      // Le promo code existe encore dans Stripe (partenaire supprimé de la DB mais pas de Stripe).
      // On désactive l'ancien puis on en crée un nouveau avec le nouveau coupon.
      try {
        const existing = await stripe.promotionCodes.list({ code: upperCode, limit: 5 });
        for (const pc of existing.data) {
          if (pc.active) {
            await stripe.promotionCodes.update(pc.id, { active: false });
          }
        }
        const promoCode = await (stripe.promotionCodes.create as any)({
          coupon: coupon.id,
          code: upperCode,
          restrictions: { first_time_transaction: true },
          metadata: { affiliate_code: upperCode },
        });
        stripePromoCodeId = promoCode.id;
      } catch (retryErr: any) {
        return NextResponse.json({ error: retryErr?.message ?? "Erreur Stripe" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: err?.message ?? "Erreur Stripe" }, { status: 500 });
    }
  }

  // ── 3. Inviter le partenaire par email (crée son compte affiliation) ────────
  let affiliateUserId: string | null = null;
  const cleanEmail = email?.trim() ?? null;

  if (cleanEmail) {
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? "https://www.duupflow.com").replace(/\/$/, "");
    const { data: inviteData } = await admin.auth.admin.inviteUserByEmail(cleanEmail, {
      redirectTo: `${appUrl}/auth/callback?next=/affiliate/dashboard`,
    });
    affiliateUserId = inviteData?.user?.id ?? null;
  }

  // ── 4. Insérer l'affilié en DB ─────────────────────────────────────────────
  const { error: dbError } = await admin.from("affiliates").insert({
    code: upperCode,
    name: name.trim(),
    email: cleanEmail,
    user_id: affiliateUserId,
    commission_pct: commissionPct,
    stripe_promotion_code_id: stripePromoCodeId,
    discount_pct: null, // null = code promo visible (pas lien seul)
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    code: upperCode,
    stripe_promotion_code_id: stripePromoCodeId,
    stripe_coupon_id: coupon.id,
    invite_sent: !!cleanEmail,
  });
}
