// src/app/api/health/route.ts
import { NextResponse } from "next/server";

// évite la mise en cache et force l'exécution à chaque requête
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        NODE_VERSION: process.version,
      },
      now: new Date().toISOString(),
    },
    { status: 200 }
  );
}