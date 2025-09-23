// src/app/account/page.tsx
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'; // pour éviter le pré-rendu statique

export default async function AccountPage() {
  // Récupération de l’utilisateur via la session (si tu utilises Supabase Auth)
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    // Pas connecté → on renvoie vers /login (change la route si besoin)
    redirect('/login');
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Mon compte</h1>
      <pre className="text-sm bg-black/30 p-4 rounded">
        {JSON.stringify(data.user, null, 2)}
      </pre>
    </main>
  );
}