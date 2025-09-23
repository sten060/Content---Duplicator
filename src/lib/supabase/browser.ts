// src/lib/supabase/browser.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Default export (recommended in client pages)
export default function createClientBrowser() {
  return createBrowserClient(url, anon);
}

// Also provide a named export for flexibility
export { createClientBrowser as createClient };