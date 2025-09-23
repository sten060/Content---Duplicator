import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import archiver from "archiver";

export const runtime = "nodejs";

export async function GET() {
  // Sur Vercel on utilise /tmp/out, en local public/out
  const OUT_DIR = process.env.VERCEL ? "/tmp/out" : path.join(process.cwd(), "public", "out");

  if (!fs.existsSync(OUT_DIR)) {
    return NextResponse.json({ error: "Aucun fichier à zipper." }, { status: 404 });
  }

  // On crée un flux PassThrough pour streamer le zip directement en réponse
  const { PassThrough } = await import("stream");
  const stream = new PassThrough();

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.on("error", (err) => {
    stream.emit("error", err);
  });

  // On pipe l'archive vers le flux de réponse
  archive.pipe(stream);

  // Ajoute tout le répertoire OUT_DIR à la racine du zip
  archive.directory(OUT_DIR, false);
  archive.finalize();

  return new NextResponse(stream as any, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="out.zip"`,
      // Empêche la mise en cache
      "Cache-Control": "no-store",
    },
  });
}