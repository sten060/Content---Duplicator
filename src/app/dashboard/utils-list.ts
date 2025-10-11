import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { getOutDirForCurrentUser } from "@/app/dashboard/utils";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const scope = (searchParams.get("scope") || "ai") as "ai" | "dup";

    const { dir: outBaseDir } = await getOutDirForCurrentUser();
    const dir = path.join(outBaseDir, scope);
    await fs.mkdir(dir, { recursive: true });

    const names = await fs.readdir(dir);
    await Promise.all(
      names.map(async (n) => {
        try { await fs.unlink(path.join(dir, n)); } catch {}
      })
    );

    return NextResponse.json({ ok: true, deleted: names.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "error" }, { status: 500 });
  }
}