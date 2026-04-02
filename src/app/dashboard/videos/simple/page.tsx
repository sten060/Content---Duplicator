// src/app/(dashboard)/videos/simple/page.tsx
import Link from "next/link";
import { listOutVideosSimple } from "../actions";
import VideoFormClient from "./VideoFormSimpleClient";
import VideoFilesClient from "../VideoFilesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideosSimplePage() {
  const files = await listOutVideosSimple();

  return (
    <main className="relative p-6 space-y-8">
      {/* Fond bleu flouté */}
      <div className="fixed top-0 left-56 right-0 h-[500px] pointer-events-none"
           style={{ background: "radial-gradient(800px 400px at 50% -100px, rgba(99,102,241,.12), transparent 70%)" }} />
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Duplication Vidéos — Simple</h1>
        <Link href="/dashboard/videos" className="text-sm text-white/40 hover:text-white/70 transition">← Retour</Link>
      </div>

      <VideoFormClient />

      <VideoFilesClient initialFiles={files} channel="simple" />
    </main>
  );
}
