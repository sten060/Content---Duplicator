// src/app/dashboard/actions.ts
"use server";

import fs from "fs/promises";
import path from "path";
import { ensureOutDir, OUT_DIR } from "@/lib/dupConfig";

/**
 * NE RIEN EXPORTER D’AUTRE QUE DES FONCTIONS ASYNC ICI
 * (pas de const exportées, pas de types exportés)
 */

export async function duplicate(formData: FormData): Promise<{ files: string[] }> {
  await ensureOutDir();

  // ---- récupère les champs du form
  const file = formData.get("file") as File | null;
  const countRaw = formData.get("count");
  const count = Math.max(1, Number(countRaw ?? 1) || 1);

  if (!file) {
    throw new Error("Aucun fichier reçu");
  }

  // Sauvegarde le fichier temporairement (Buffer depuis File)
  const arrayBuffer = await file.arrayBuffer();
  const inputBuf = Buffer.from(arrayBuffer);
  const tmpIn = path.join(OUT_DIR, `tmp_${Date.now()}.${(file.name.split(".").pop() || "bin")}`);

  await fs.writeFile(tmpIn, inputBuf);

  const outputs: string[] = [];

  // ------ ICI: TON PIPELINE EXISTANT (ffmpeg/sharp/exiftool…)
  // Lis à partir de `tmpIn`, génère N fichiers et pousse leur chemin public dans `outputs`.
  // Par exemple (vidéo) tu finissais par écrire `dup_*.mp4` dans OUT_DIR.
  // PSEUDO-EXEMPLE:
  //
  // for (let i = 1; i <= count; i++) {
  //   const out = path.join(OUT_DIR, `dup_${i}_${crypto.randomUUID()}.mp4`);
  //   await runFfmpeg(tmpIn, out, {...tes options...});
  //   outputs.push(`/out/${path.basename(out)}`);
  // }
  //
  // pour les images, même idée avec sharp/exiftool, et push aussi `/out/xxx.jpg`

  // ------ FIN TON PIPELINE

  // Nettoyage du tmp
  try { await fs.unlink(tmpIn); } catch {}

  return { files: outputs };
}

export async function deleteAll(): Promise<{ ok: true }> {
  await ensureOutDir();

  const files = await fs.readdir(OUT_DIR);
  await Promise.all(
    files.map(async (name) => {
      const p = path.join(OUT_DIR, name);
      await fs.unlink(p).catch(() => {});
    })
  );

  return { ok: true };
}