// src/lib/supabase/browser.ts
"use client";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase côté navigateur (CSR)
 * Utilise les variables publiques (Vercel / .env) :
 *   NEXT_PUBLIC_SUPABASE_URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createSupabaseClient(url, anon);
}

// on exporte AUSSI en défaut pour que les deux syntaxes marchent
export default createClient;