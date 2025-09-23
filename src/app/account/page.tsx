// Server Component (pas de "use client")
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic"; // évite la mise en cache Vercel sur cette page

export default async function AccountPage() {
  const supabase = createClientServer();
  const { data, error } = await supabase.auth.getUser();

  // Pas connecté → on renvoie au login
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: 16 }}>
      <h1>Mon compte</h1>
      <p>Bienvenue, {data.user.email}</p>

      <form action="/logout" method="post">
        <button type="submit">Se déconnecter</button>
      </form>
    </main>
  );
}