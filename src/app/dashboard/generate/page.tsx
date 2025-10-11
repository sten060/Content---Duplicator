// app/dashboard/generate/page.tsx
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSessionRSC } from "@/lib/supabase/server-rsc";
import GenerateFormClient from "./GenerateFormClient";
import { generateAction } from "./actions"; // action serveur

export const metadata: Metadata = {
  title: "Génération IA — ContentDuplicator",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GeneratePage() {
  const session = await getSessionRSC?.();
  if (!session) redirect("/login");

  // ✅ On passe l’action serveur au composant client ici :
  return <GenerateFormClient action={generateAction} />;
}