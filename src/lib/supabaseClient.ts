// src/lib/supabaseClient.ts
import { createBrowserClient, createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

// Clé publique → accessible dans le navigateur
export function createClientBrowser(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Clé serveur → plus sécurisé
export function createClientServer(): SupabaseClient {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: () => {
        return {
          get: () => undefined,
          set: () => {},
          remove: () => {},
        };
      },
    }
  );
}
