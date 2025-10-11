"use server";

import path from "path";
import fs from "fs/promises";
import crypto from "crypto";
import { getOutDirForCurrentUser } from "@/app/dashboard/utils";
import { generateImage } from "@/lib/ai/replicate";
import { buildPrompt } from "@/lib/ai/prompt";

function randSuffix() {
  return crypto.randomBytes(2).toString("hex");
}

export async function generateAction(formData: FormData) {
  try {
    const n = Math.max(1, Math.min(4, Number(formData.get("n") ?? 1)));
    const decor = String(formData.get("decor") || "").trim();
    const tenue = String(formData.get("tenue") || "").trim();
    const accessoires = String(formData.get("accessoires") || "").trim();
    const style = String(formData.get("style") || "").trim();
const keepPose = formData.get("keepPose") === "on";
const keepFace = formData.get("keepFace") === "on";

// Valeurs par défaut
let strength = 0.6;
let ipAdapterScale = 0.8;

// Ajuste selon les cases cochées
if (keepPose) strength = 0.5;
if (keepFace) ipAdapterScale = 0.9;

    // 1) récupérer le fichier du champ name="image"
    const file = formData.get("image") as File | null;
    if (!file || file.size === 0) {
      return { ok: false as const, error: "Ajoute une image de référence." };
    }

    // 2) on sauvegarde localement et on fabrique une URL publique vers /out/...
    const site =
      (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "") ||
      "http://localhost:3000";

    const buf = Buffer.from(await file.arrayBuffer());
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    const safeBase = file.name.replace(/\.[^.]+$/, "");
    const name = `${safeBase || "ref"}.${ext}`;

    const { dir, userId } = await getOutDirForCurrentUser(); // <- ta fonction existante
    await fs.writeFile(path.join(dir, name), buf);

    const imageUrl = `${site}/out/${userId}/${encodeURIComponent(name)}`;
    console.log("➡ imageUrl envoyée à Replicate:", imageUrl);

    // 3) construire le prompt
const prompt = buildPrompt({ decor, tenue, accessoires, style });

    // 4) appeler Replicate avec imageUrl
    const urls = await generateImage({
      imageUrl,
  prompt,
  numOutputs: n,
});
    if (!urls?.length) {
      return { ok: false as const, error: "Aucune image générée." };
    }

    return { ok: true as const, urls };
  } catch (e: any) {
    console.error("generateAction error:", e);
    return { ok: false as const, error: e?.message || "Erreur inconnue." };
  }
}