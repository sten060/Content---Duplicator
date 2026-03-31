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

      <section className="grid gap-5 md:grid-cols-2">
        {/* Mode Simple — indigo glow border */}
        <Link
          href="/dashboard/videos/simple"
          className="group relative rounded-2xl p-5 transition-all overflow-hidden
                     border border-indigo-500/20 hover:border-indigo-400/40
                     hover:shadow-[0_0_30px_rgba(99,102,241,.15)]"
          style={{ background: "rgba(99,102,241,0.04)" }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ background: "radial-gradient(600px at 30% 20%, rgba(99,102,241,.08), transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-lg font-bold text-white/90">Mode Simple</h2>
            <p className="text-sm text-white/50 mt-1">
              Packs légers + filtres clés (flip, rotation, dimension, bordure, miroir). Tout est cumulable.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-sm text-indigo-300 group-hover:gap-3 transition-all">
              <span>Commencer</span>
              <span>→</span>
            </div>
          </div>
        </Link>

        {/* Mode Avancé — sky glow border */}
        <Link
          href="/dashboard/videos/advanced"
          className="group relative rounded-2xl p-5 transition-all overflow-hidden
                     border border-sky-500/20 hover:border-sky-400/40
                     hover:shadow-[0_0_30px_rgba(56,189,248,.15)]"
          style={{ background: "rgba(56,189,248,0.04)" }}
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
               style={{ background: "radial-gradient(600px at 30% 20%, rgba(56,189,248,.08), transparent 70%)" }} />
          <div className="relative">
            <h2 className="text-lg font-bold text-white/90">Mode Avancé</h2>
            <p className="text-sm text-white/50 mt-1">
              Contrôles précis (Min/Max ou W×H), templates, rendu cohérent avec tirage aléatoire par copie.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 text-sm text-sky-300 group-hover:gap-3 transition-all">
              <span>Configurer</span>
              <span>→</span>
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
