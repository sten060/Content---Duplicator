// src/app/account/page.tsx
import { createClientServer } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // pas de cache Vercel sur cette page

export default async function AccountPage() {
  const supabase = createClientServer();

  // Récupère l'utilisateur côté serveur
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Pas connecté → on renvoie vers /login
  if (!user) {
    redirect("/login");
  }

  // Si connecté, on peut aussi récupérer son profil si tu as une table "profiles"
  // const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <main className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-semibold mb-6">Mon compte</h1>

      <div className="space-y-3 rounded-lg border p-4 bg-black/20">
        <div className="text-sm opacity-80">Utilisateur</div>
        <div className="text-lg">{user.email}</div>

        {/* Exemple d’info supplémentaire */}
        {/* <div>Nom : {profile?.full_name ?? "—"}</div> */}
      </div>

      <div className="mt-8">
        <a
          href="/dashboard"
          className="inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
        >
          Revenir au dashboard
        </a>
      </div>
    </main>
  );
}