// src/app/dashboard/utils.ts
import path from "path";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { getSessionRSC } from "@/lib/supabase/server-rsc";

// Dossier racine des sorties (public/out)
const OUT_BASE = process.env.OUT_BASE || path.join(process.cwd(), "public", "out");

/** Récupère la session côté serveur (RSC) ou redirige vers /login */
async function requireUser() {
  const session = await getSessionRSC(); // null si non connecté
  const user = session?.user ?? null;
  if (!user) redirect("/login"); // <- plus jamais de user null après cette ligne
  return user;
}

/** Dossier utilisateur (garanti) + création si besoin */
export async function getOutDirForCurrentUser() {
  const user = await requireUser();             // user non-null garanti
  const userDir = path.join(OUT_BASE, user.id); // plus de TS error
  await fs.mkdir(userDir, { recursive: true });
  return { dir: userDir, userId: user.id };
}

/** Version utilisable aussi dans des RSC (pages/listings) */
export async function getOutDirForCurrentUserRSC() {
  return getOutDirForCurrentUser();
}