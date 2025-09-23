// src/app/(auth)/signup/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import createClient from '@/lib/supabase/browser';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/account` },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setOk("Vérifie ta boîte mail pour valider l'inscription.");
    // Si tu n'utilises pas la confirmation email, tu peux router directement :
    // router.push('/account');
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Créer un compte</h1>

      <form onSubmit={onSubmit} className="grid gap-4">
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button disabled={loading} className="btn btn-primary">
          {loading ? 'Création…' : "S'inscrire"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {ok && <p className="text-green-600 mt-3">{ok}</p>}
    </main>
  );
}