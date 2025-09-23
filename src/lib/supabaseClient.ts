// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

/**
 * Client Supabase côté serveur/edge avec la clé anonyme.
 * Les variables viennent de Vercel (Project → Settings → Environment Variables).
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);