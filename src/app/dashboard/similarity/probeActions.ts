"use server";

import os from "os";
import path from "path";
import fs from "fs/promises";
import { spawn } from "child_process";

async function getFFprobeBin(): Promise<string> {
  const { existsSync } = await import("fs");

  // 1. PATH lookup via shell built-in
  try {
    const { execSync } = await import("child_process");
    const found = execSync("command -v ffprobe", { encoding: "utf8", shell: "/bin/sh" }).trim();
    if (found && existsSync(found)) return found;
  } catch {}

  // 2. Well-known paths (nixpacks, apt, Nix store symlink)
  const CANDIDATES = [
    "/usr/bin/ffprobe",
    "/usr/local/bin/ffprobe",
    "/nix/var/nix/profiles/default/bin/ffprobe",
  ];
  for (const p of CANDIDATES) {
    if (existsSync(p)) return p;
  }

  // 3. Try ffprobe next to the resolved ffmpeg binary
  try {
    const { getFFmpegBin } = await import("@/app/dashboard/videos/processVideos");
    const ffmpegBin = await getFFmpegBin();
    const ffprobeBin = ffmpegBin.replace(/ffmpeg([^/]*)$/, "ffprobe$1");
    if (existsSync(ffprobeBin)) return ffprobeBin;
  } catch {}

  // 4. Bare fallback — let spawn try PATH
  return "ffprobe";
}

/**
 * Run ffprobe on an uploaded file and return its format metadata as JSON.
 */
export async function probeFile(formData: FormData): Promise<{ format: Record<string, any>; streams?: Record<string, any>[] } | { error: string }> {
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "Aucun fichier reçu." };

  // Write to temp file
  const ext = path.extname(file.name) || ".mp4";
  const tmpPath = path.join(os.tmpdir(), `duup_probe_${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`);
  await fs.writeFile(tmpPath, Buffer.from(await file.arrayBuffer()));

  try {
    const probeBin = await getFFprobeBin();
    console.log(`[ffprobe] using: ${probeBin}`);

    const result = await new Promise<string>((resolve, reject) => {
      const args = ["-v", "quiet", "-print_format", "json", "-show_format", "-show_streams", tmpPath];
      const p = spawn(probeBin, args, { stdio: ["ignore", "pipe", "pipe"] });
      let stdout = "";
      let stderr = "";
      p.stdout.on("data", (d: Buffer) => { stdout += d.toString(); });
      p.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });
      p.on("error", () => reject(new Error(`ffprobe introuvable (tried: ${probeBin})`)));
      p.on("close", (code) => {
        if (code === 0) resolve(stdout);
        else reject(new Error(stderr || `ffprobe exit ${code}`));
      });
      setTimeout(() => { p.kill("SIGKILL"); reject(new Error("ffprobe timeout")); }, 10_000);
    });

    try {
      return JSON.parse(result);
    } catch {
      return { error: "Format de réponse invalide" };
    }
  } catch (e: any) {
    return { error: e?.message || "Erreur ffprobe" };
  } finally {
    await fs.unlink(tmpPath).catch(() => {});
  }
}
