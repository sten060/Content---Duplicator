"use server";

import fs from "fs";
import path from "path";
import { exec } from "child_process";
import util from "util";
import sharp from "sharp";
import ffmpeg from "fluent-ffmpeg";

const execPromise = util.promisify(exec);

// 👉 Dossier temporaire si on est sur Vercel, sinon dossier local
const OUT_DIR = process.env.VERCEL ? "/tmp/out" : path.join(process.cwd(), "public", "out");

// Fonction pour vider le dossier
export async function clearOutput() {
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  return { success: true };
}

// Fonction de duplication (images + vidéos)
export async function duplicateFile(filePath: string, count: number) {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath, ext);

  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    const outputName = `${base}_copy${i + 1}${ext}`;
    const outputPath = path.join(OUT_DIR, outputName);

    if ([".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      // Duplication d'images avec variations
      await sharp(filePath)
        .rotate(Math.floor(Math.random() * 360)) // orientation aléatoire
        .modulate({
          brightness: 0.98 + Math.random() * 0.04, // luminosité légèrement différente
          saturation: 0.98 + Math.random() * 0.04, // saturation différente
        })
        .resize({
          width: 1000 + Math.floor(Math.random() * 10), // légère variation largeur
          height: 1000 + Math.floor(Math.random() * 10), // légère variation hauteur
        })
        .jpeg({ quality: 80 + Math.floor(Math.random() * 10) }) // recompression
        .toFile(outputPath);

    } else if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
      // Duplication de vidéos avec FFmpeg
      await new Promise((resolve, reject) => {
        ffmpeg(filePath)
          .outputOptions([
            "-c:v libx264",
            "-preset veryfast",
            `-crf ${20 + Math.floor(Math.random() * 6)}`, // qualité variable
            `-b:v ${4000 + Math.floor(Math.random() * 500)}k`, // débit variable
            "-c:a aac",
            "-b:a 128k",
            "-movflags faststart"
          ])
          .save(outputPath)
          .on("end", resolve)
          .on("error", reject);
      });
    } else {
      // Autres fichiers : simple copie
      fs.copyFileSync(filePath, outputPath);
    }

    results.push(outputPath);
  }

  return results;
}