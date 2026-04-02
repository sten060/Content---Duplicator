"use client";

import Link from "next/link";
import Header from "@/components/Header";

const G = "bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent";

const testimonials = [
  { quote: "DuupFlow a divisé par 10 notre temps de production. On scale nos campagnes sans effort.", author: "Agence PixelForce", role: "Growth Marketing" },
  { quote: "On ne peut plus s'en passer. L'outil est devenu indispensable pour notre workflow quotidien.", author: "Studio Kreatif", role: "Création de contenu" },
  { quote: "Le meilleur investissement qu'on ait fait cette année. ROI immédiat.", author: "MediaVibe Agency", role: "Social Media Management" },
];

interface Section {
  title: string;
  text: string;
  mockupLabel: string;
  mockupDetails: string[];
}

const sections: Section[] = [
  {
    title: "Duplication ultra-rapide",
    text: "Fini les heures d'attente. DuupFlow duplique des dizaines de contenus en quelques secondes. Votre workflow passe à la vitesse supérieure.",
    mockupLabel: "Duplication en cours...",
    mockupDetails: ["video_campagne_01.mp4", "video_campagne_02.mp4", "video_campagne_03.mp4", "32 fichiers — 4.2s"],
  },
  {
    title: "Qualité parfaite, zéro compromis",
    text: "Chaque duplication conserve la qualité exacte de l'original. 1080p reste 1080p, 4K reste 4K. Aucune perte, aucune compression supplémentaire.",
    mockupLabel: "Analyse qualité",
    mockupDetails: ["Original: 1920x1080 · H.264", "Copie: 1920x1080 · H.264", "Delta pixels: 0.00%", "Qualité: identique"],
  },
  {
    title: "Duplication invisible",
    text: "Modifiez l'empreinte numérique de vos fichiers sans toucher au visuel. Métadonnées, hash, paramètres techniques — tout change, sauf ce que vos clients voient.",
    mockupLabel: "Empreinte modifiée",
    mockupDetails: ["Hash SHA-256: ████████ → ████████", "Metadata: régénérées", "Visuel: inchangé", "Détection: 0 match"],
  },
  {
    title: "Priorité algorithme",
    text: "Un clic suffit pour injecter des métadonnées iPhone authentiques dans vos duplications. Les algorithmes pensent que le contenu vient d'un appareil réel. Votre contenu a plus de chances de performer.",
    mockupLabel: "Injection métadonnées",
    mockupDetails: ["Device: iPhone 15 Pro Max", "Lens: 6.765mm f/1.78", "GPS: 48.8566° N, 2.3522° E", "Status: injecté"],
  },
  {
    title: "Signature IA effacée",
    text: "Votre contenu est détecté comme généré par l'IA ? C'était avant DuupFlow. Notre module efface les signatures IA (EXIF, C2PA, JUMBF) et les remplace par une identité humaine réaliste. Les algorithmes ne font plus la différence.",
    mockupLabel: "Nettoyage IA",
    mockupDetails: ["C2PA: supprimé", "JUMBF: supprimé", "EXIF IA: remplacé", "Résultat: contenu humain"],
  },
];

function MockupBox({ label, details }: { label: string; details: string[] }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] p-6 sm:p-8" style={{ background: "rgba(255,255,255,0.02)" }}>
      <div className="rounded-xl border border-white/[0.06] bg-black/40 p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          <span className="ml-2 text-xs text-white/30 font-mono">{label}</span>
        </div>
        <div className="space-y-2">
          {details.map((d, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
              <span className="text-sm text-white/50 font-mono">{d}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <div className="h-full rounded-full w-full" style={{ background: "linear-gradient(90deg,#6366F1,#38BDF8)" }} />
        </div>
      </div>
    </div>
  );
}

export default function AvantagesPage() {
  return (
    <div className="min-h-screen text-white tech-grid">
      <Header />

      {/* Frosted glass — fixed, covers right half from top of viewport */}
      <div
        className="fixed top-0 right-0 w-1/2 h-screen hidden md:block z-0"
        style={{ backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", background: "rgba(6,10,28,0.25)" }}
      />

      {/* Hero */}
      <div className="relative z-10 min-h-screen grid md:grid-cols-2">
        {/* Left — headline */}
        <div className="px-8 sm:px-16 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Découvrez les avantages{" "}
            <span className={G}>DuupFlow</span>{" "}
            pour votre agence
          </h1>
          <p className="mt-4 text-white/50 max-w-md">
            Plus de rapidité, plus de qualité, plus de performances.
            Voici pourquoi les meilleures agences nous font confiance.
          </p>
        </div>

        {/* Right — testimonials like reference */}
        <div className="flex flex-col items-center justify-center py-32 px-4 relative overflow-hidden">

          {/* Dashed arc */}
          <svg className="absolute pointer-events-none opacity-[0.08]" width="500" height="500" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="200" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="8 8" />
          </svg>

          {/* Left card — cut off at left edge, blurred */}
          <div
            className="absolute -left-24 top-[12%] w-[280px] rounded-2xl p-5 opacity-40 blur-[1.5px]"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-[11px] text-white/70 leading-relaxed">
              {testimonials[0].quote}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-400 to-sky-400" />
              <div>
                <p className="text-[11px] font-semibold text-white/60">{testimonials[0].author}</p>
                <p className="text-[9px] text-white/30">{testimonials[0].role}</p>
              </div>
            </div>
          </div>

          {/* Right card — cut off at right edge, blurred */}
          <div
            className="absolute -right-20 top-[8%] w-[280px] rounded-2xl p-5 opacity-40 blur-[1.5px]"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p className="text-[11px] text-white/70 leading-relaxed">
              {testimonials[2].quote}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400" />
              <div>
                <p className="text-[11px] font-semibold text-white/60">{testimonials[2].author}</p>
                <p className="text-[9px] text-white/30">{testimonials[2].role}</p>
              </div>
            </div>
          </div>

          {/* Center card — main, white-ish bg, elevated, sharp */}
          <div
            className="relative z-20 w-full max-w-[360px] rounded-2xl p-7"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <p className="text-[15px] text-white/90 leading-relaxed">
              &ldquo;{testimonials[1].quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div
                className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                style={{ background: "linear-gradient(135deg, #C026D3, #6366F1)" }}
              >
                {testimonials[1].author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-white/90">{testimonials[1].author}</p>
                <p className="text-xs text-white/40">{testimonials[1].role}</p>
              </div>
            </div>
          </div>

          {/* Logo circles on the arc — decorative */}
          <div className="absolute bottom-[22%] left-[12%] h-12 w-12 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
            <span className="text-[10px] font-bold text-white/30">DF</span>
          </div>
          <div className="absolute bottom-[28%] right-[10%] h-10 w-10 rounded-full border border-white/[0.08] bg-white/[0.04] flex items-center justify-center">
            <span className="text-[9px] font-bold text-white/25">MV</span>
          </div>

          {/* Bottom text */}
          <p className="relative z-20 mt-12 text-xs text-white/25">
            Utilisé par <span className="text-white/50 font-medium">500+ agences</span> marketing & créateurs
          </p>
        </div>
      </div>

      {/* Alternating sections */}
      <div className="relative z-10">
        {sections.map((s, i) => {
        const reversed = i % 2 !== 0;
        return (
          <section key={i} className="py-16 px-6">
            <div className={`max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center ${reversed ? "md:direction-rtl" : ""}`}>
              {/* Mockup */}
              <div className={reversed ? "md:order-2" : ""}>
                <MockupBox label={s.mockupLabel} details={s.mockupDetails} />
              </div>
              {/* Text */}
              <div className={reversed ? "md:order-1" : ""}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  <span className={G}>{s.title}</span>
                </h2>
                <p className="text-white/50 leading-relaxed">{s.text}</p>
              </div>
            </div>
          </section>
        );
      })}
      </div>

      {/* CTA */}
      <div className="relative z-10">
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">
          Prêt à transformer votre <span className={G}>workflow</span> ?
        </h2>
        <p className="text-white/40 mb-8 max-w-md mx-auto">
          Rejoignez les agences qui produisent plus, plus vite, sans compromis.
        </p>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "linear-gradient(135deg,#6366F1,#38BDF8)" }}
        >
          Commencer gratuitement &rarr;
        </Link>
      </section>
      </div>
    </div>
  );
}
