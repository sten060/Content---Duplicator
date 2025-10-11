"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { getOutDirForCurrentUser } from "@/app/dashboard/utils";

// Supprime uniquement les images de la page "Duplication Images" (préfixe IMG_)
export async function clearImages() {
  const { dir } = await getOutDirForCurrentUser(); // ex: public/out/<userId>
  const files = await fs.readdir(dir);
  const toDelete = files.filter((f) => f.startsWith("IMG_")); // ajuste si besoin

  await Promise.all(
    toDelete.map((f) => fs.unlink(path.join(dir, f)).catch(() => {}))
  );

  // Rafraîchit la page Images
  revalidatePath("/dashboard/images");
}