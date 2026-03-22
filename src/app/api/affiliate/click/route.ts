import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Vérifie que le code existe
    const { data: affiliate } = await admin
      .from("affiliates")
      .select("code")
      .eq("code", code)
      .single();

    if (!affiliate) {
      return NextResponse.json({ error: "Unknown code" }, { status: 404 });
    }

    await admin.from("affiliate_clicks").insert({ affiliate_code: code });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
