import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest) {
  // Vérification CEO
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const adminUserId = process.env.ADMIN_USER_ID;
  if (!adminUserId || user.id !== adminUserId) {
    return NextResponse.json({ error: "Interdit" }, { status: 403 });
  }

  const { code } = await req.json();
  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Code manquant" }, { status: 400 });
  }

  const admin = createAdminClient();

  // Supprime les paiements affiliés liés (FK), puis l'affilié
  // affiliate_clicks supprimés automatiquement grâce au ON DELETE CASCADE
  await admin.from("affiliate_payments").delete().eq("affiliate_code", code);
  const { error } = await admin.from("affiliates").delete().eq("code", code);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
