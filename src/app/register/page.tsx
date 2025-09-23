// src/app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const supabase = createClientBrowser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setErr(error.message);
    // Option : tu peux forcer une validation email dans Supabase.
    router.replace("/dashboard");
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input
          className="border rounded p-2"
          type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border rounded p-2"
          type="password" placeholder="Mot de passe"
          value={password} onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <p className="text-red-500 text-sm">{err}</p>}
        <button
          type="submit"
          className="bg-black text-white rounded py-2"
          disabled={loading}
        >
          {loading ? "Création..." : "Créer mon compte"}
        </button>
        <a className="text-sm underline" href="/login">
          Déjà inscrit ? Se connecter
        </a>
      </form>
    </main>
  );
}
