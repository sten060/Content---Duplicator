// src/app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClientBrowser } from "@/lib/supabaseClient";

export default function LoginPage() {
  const supabase = createClientBrowser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <main className="max-w-md mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold mb-6">Connexion</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border bg-black/10 px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full rounded border bg-black/10 px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {err && <p className="text-red-500 text-sm">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Pas de compte ?{" "}
        <a className="text-blue-400 underline" href="/register">
          Créer un compte
        </a>
      </p>
    </main>
  );
}