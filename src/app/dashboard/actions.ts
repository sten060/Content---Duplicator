'use server';

// src/app/dashboard/actions.ts
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export const OUT_DIR = path.join(process.cwd(), 'public', 'out');

/** S'assure que le dossier public/out existe */
async function ensureOutDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}

/** Liste les fichiers déjà générés (ex: pour les afficher sur le dashboard) */
export async function listOutputs(): Promise<string[]> {
  await ensureOutDir();
  const entries = await fs.readdir(OUT_DIR);
  // On ne garde que les fichiers "visibles"
  return entries
    .filter((f) => !f.startsWith('.'))
    .map((f) => `/out/${f}`) // chemins web (public/)
    .sort((a, b) => (a < b ? 1 : -1));
}

/** Supprime tout le dossier out/ */
export async function deleteAll(): Promise<void> {
  await ensureOutDir();
  const entries = await fs.readdir(OUT_DIR);
  await Promise.all(
    entries.map((name) => fs.rm(path.join(OUT_DIR, name), { recursive: true, force: true }))
  );
  // On revalide la page dashboard pour rafraîchir la liste
  revalidatePath('/dashboard');
}

/**
 * Action serveur appelée par le <form>.
 * IMPORTANT: ne rien retourner (Promise<void>) pour respecter le type Next.
 * Tu peux coller ici TON code de duplication (images/vidéos) que tu utilisais déjà en local.
 */
export async function duplicate(formData: FormData): Promise<void> {
  await ensureOutDir();

  const file = formData.get('file') as File | null;
  const count = Number(formData.get('count') ?? 1);

  if (!file) {
    throw new Error('Aucun fichier reçu');
  }
  if (!Number.isFinite(count) || count < 1 || count > 20) {
    throw new Error('Paramètre "count" invalide');
  }

  // ---------- Sauvegarde du fichier temporaire ----------
  const arrayBuffer = await file.arrayBuffer();
  const tmpIn = path.join(OUT_DIR, `tmp_${Date.now()}_${file.name}`);
  await fs.writeFile(tmpIn, Buffer.from(arrayBuffer));

  // ---------- Détection simple ----------
  const isVideo = /\.(mp4|mov|m4v|avi|mkv|webm)$/i.test(file.name);
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(file.name);

  // ---------- Duplique N fois ----------
  for (let i = 1; i <= count; i++) {
    const outName = `dup_${i}_${crypto.randomUUID()}.${isVideo ? 'mp4' : isImage ? 'jpg' : 'bin'}`;
    const outPath = path.join(OUT_DIR, outName);

    // >>>>> ICI COLLE TON PIPELINE EXISTANT <<<<<
    // - Pour les vidéos: ffmpeg (libx264, preset veryfast, crf 22, maxrate/bufsize, metadata…)
    // - Pour les images: sharp/exiftool (rename, bruit léger, variation luminosité/contraste, recompression, EXIF, etc.)
    //
    // Exemple minimaliste (copie brut, à remplacer par TON vrai traitement):
    await fs.copyFile(tmpIn, outPath);
  }

  // Nettoyage
  try { await fs.rm(tmpIn, { force: true }); } catch {}

  // Rafraîchit la page dashboard
  revalidatePath('/dashboard');
}