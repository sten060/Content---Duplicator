// src/lib/dupConfig.ts
import path from "path";
import fs from "fs/promises";

export const OUT_DIR = path.join(process.cwd(), "public", "out");

export async function ensureOutDir() {
  await fs.mkdir(OUT_DIR, { recursive: true });
}
