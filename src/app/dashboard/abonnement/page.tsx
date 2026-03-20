import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import AbonnementClient from "./AbonnementClient";

export const dynamic = "force-dynamic";

export default async function AbonnementPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const admin = createAdminClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("plan, stripe_customer_id, subscription_period_start, is_guest")
    .eq("id", user.id)
    .single();

  if (profile?.is_guest) redirect("/dashboard/settings");

  const plan = (profile?.plan as "solo" | "pro" | null) ?? null;
  const hasStripePortal = !!profile?.stripe_customer_id;
  const subscriptionPeriodStart = profile?.subscription_period_start ?? null;

  let usage: { images: number; videos: number; ai_signatures: number } | null = null;
  if (plan) {
    const { data: usageRow } = await admin
      .from("usage_tracking")
      .select("images_count, videos_count, ai_signatures_count")
      .eq("user_id", user.id)
      .single();

    usage = {
      images: usageRow?.images_count ?? 0,
      videos: usageRow?.videos_count ?? 0,
      ai_signatures: usageRow?.ai_signatures_count ?? 0,
    };
  }

  return (
    <AbonnementClient
      plan={plan}
      usage={usage}
      hasStripePortal={hasStripePortal}
      subscriptionPeriodStart={subscriptionPeriodStart}
    />
  );
}
