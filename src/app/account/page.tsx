// src/app/account/page.tsx
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

// On force le rendu côté serveur à chaque requête (pas de pré-rendu statique)
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  // Récupère l'utilisateur connecté (session côté navigateur)
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("supabase.auth.getUser error:", error);
  }

  // Si pas d'utilisateur => on envoie vers la page de login
  if (!data?.user) {
    redirect("/login"); // Assure-toi que /login existe dans ton app
  }

  const user = data.user;

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-semibold">Mon compte</h1>

      <div className="mt-6 grid gap-4">
        <section className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </section>

        <section className="rounded-lg border p-4">
          <p className="text-sm text-gray-500">ID utilisateur</p>
          <p className="font-mono text-xs break-all">{user.id}</p>
        </section>
      </div>
    </main>
  );
}