// src/app/(dashboard)/videos/advanced/page.tsx
import Link from "next/link";
import { listOutVideosAdvanced } from "../actions";
import VideoFormAdvancedClient from "./VideoFormAdvancedClient";
import VideoFilesClient from "../VideoFilesClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideosAdvancedPage() {
  const files = await listOutVideosAdvanced();

  return (
    <main className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Duplication Vidéos — Avancé</h1>
        <Link href="/dashboard/videos" className="text-sm text-white/40 hover:text-white/70 transition">← Retour</Link>
      </div>

      <VideoFormAdvancedClient />

      <VideoFilesClient initialFiles={files} channel="advanced" />
    </main>
  );
}
