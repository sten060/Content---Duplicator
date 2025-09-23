// src/app/api/out/zip/route.ts
import { NextResponse } from "next/server";
import archiver from "archiver";
import { createClientServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export async function GET() {
  const supabase = createClientServer();
  const bucket = process.env.SUPABASE_BUCKET!;

  // Liste des objets
  const { data: list, error } = await supabase.storage.from(bucket).list("", { limit: 500 });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Crée un stream ZIP
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const archive = archiver("zip", { zlib: { level: 9 } });
  archive.on("error", (err) => {
    try { writer.abort(err); } catch {}
  });
  // Pipe archive → writer
  const stream = archive as unknown as NodeJS.ReadableStream;
  (async () => {
    const reader = stream as any;
    const encoder = new TextEncoder();

    // @ts-ignore – web stream adapter
    for await (const chunk of reader) {
      await writer.write(chunk as Uint8Array);
    }
    await writer.close();
  })();

  // Ajoute chaque fichier au zip via son URL publique
  for (const item of list ?? []) {
    if (!item.name) continue;
    const { data } = supabase.storage.from(bucket).getPublicUrl(item.name);
    const url = data.publicUrl;
    const res = await fetch(url);
    if (!res.ok) continue;
    archive.append(Buffer.from(await res.arrayBuffer()), { name: item.name });
  }

  await archive.finalize();

  return new NextResponse(readable as any, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="outputs.zip"`,
    },
  });
}