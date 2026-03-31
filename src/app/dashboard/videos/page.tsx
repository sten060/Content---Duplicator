import Link from "next/link";
import Toasts from "../Toasts";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideosHub({
  searchParams,
}: { searchParams?: { ok?: string; err?: string; warn?: string } }) {
  const ok = Boolean(searchParams?.ok);
  const err = searchParams?.err ? decodeURIComponent(searchParams.err) : undefined;
  const warn = searchParams?.warn ? decodeURIComponent(searchParams.warn) : undefined;

  return (
    <main className="p-6 space-y-8">
      <Toasts ok={ok} err={err} warn={warn} />

      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Duplication Vidéos</h1>
        <p className="text-sm text-white/50 mt-1">Choisis ton mode de travail.</p>
      </header>

      <div className="h-px bg-white/[0.06]" />

      <section className="grid gap-4 md:grid-cols-2 max-w-2xl">
        <Link
          href="/dashboard/videos/simple"
          className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 hover:bg-indigo-500/[0.06] hover:border-indigo-400/20 transition-all"
        >
          <div>
            <h2 className="text-sm font-semibold text-white/90">Mode Simple</h2>
            <p className="text-xs text-white/45 mt-0.5">Packs légers, filtres clés, rapide</p>
          </div>
          <span className="text-indigo-400 text-sm opacity-0 group-hover:opacity-100 transition">→</span>
        </Link>

        <Link
          href="/dashboard/videos/advanced"
          className="group flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 hover:bg-sky-500/[0.06] hover:border-sky-400/20 transition-all"
        >
          <div>
            <h2 className="text-sm font-semibold text-white/90">Mode Avancé</h2>
            <p className="text-xs text-white/45 mt-0.5">Contrôles précis, templates, Min/Max</p>
          </div>
          <span className="text-sky-400 text-sm opacity-0 group-hover:opacity-100 transition">→</span>
        </Link>
      </section>
    </main>
  );
}
