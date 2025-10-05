// src/app/dashboard/utils.ts
import path from "path";
import fs from "fs/promises";
import { createClientRSC } from "@/lib/supabase/server-rsc";

const OUT_BASE = process.env.OUT_BASE || path.join(process.cwd(), "public", "out");

/** 🔐 Récupère le user côté serveur via les cookies Supabase */
export async function getCurrentUser() {
  const supabase = createClientRSC();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user ?? null;
}

/** 📁 Crée (si besoin) un dossier unique par utilisateur */
export async function getOutDirForCurrentUser() {
  const user = await getCurrentUser();
  const userDir = path.join(OUT_BASE, user.id);
  await fs.mkdir(userDir, { recursive: true });
  return { dir: userDir, userId: user.id };
}

/** 🧠 Variante utilisable dans les composants server (RSC) */
export async function getOutDirForCurrentUserRSC() {
  return getOutDirForCurrentUser();
}