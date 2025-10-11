"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { stars: 5, text: "Zeno a clarifié notre pipeline et accéléré nos cycles. Moins d’erreurs, plus de sorties.", author: "Léna P.", role: "Growth Manager" },
  { stars: 5, text: "Nos reposts cross-plateformes passent crème et on gagne un temps fou sur l’export.", author: "Bilal S.", role: "Head of Social" },
  { stars: 5, text: "Interface lisible, process clean, résultats nets. C’est devenu notre standard interne.", author: "Aïcha D.", role: "Ops Marketing" },
  { stars: 5, text: "On a pu scaler sans perdre en qualité. Les équipes valident plus vite, ça convertit mieux.", author: "Thomas R.", role: "CMO" },
  { stars: 5, text: "Support réactif, pipeline fiable. Les copies restent indétectables côté plateformes.", author: "Nora K.", role: "Agency Owner" },
];

// composant étoiles
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-yellow-400">
          <path d="M9.05 2.93c.3-.92 1.6-.92 1.9 0l1.2 3.68c.14.42.52.7.95.7h3.86c.97 0 1.37 1.24.59 1.81l-3.13 2.27c-.36.26-.5.73-.36 1.12l1.2 3.68c.3.92-.75 1.69-1.54 1.12l-3.13-2.27a1.1 1.1 0 0 0-1.18 0l-3.13 2.27c-.78.57-1.84-.2-1.54-1.12l1.2-3.68c.14-.39 0-.86-.36-1.12L2.45 9.11c-.78-.57-.38-1.81.59-1.81H6.9c.43 0 .81-.28.95-.7l1.2-3.68Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const list = [...ITEMS, ...ITEMS]; // duplication pour boucle fluide

  useEffect(() => {
    let raf = 0;
    let x = 0;
    const speed = 0.35;

    const step = () => {
      if (!paused && trackRef.current) {
        x -= speed;
        const half = trackRef.current.scrollWidth / 2;
        if (Math.abs(x) >= half) x = 0;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const nudge = (dir: "left" | "right") => {
    const delta = dir === "left" ? 300 : -300;
    if (trackRef.current) {
      const matrix = new DOMMatrixReadOnly(
        getComputedStyle(trackRef.current).transform
      );
      const current = matrix.m41;
      trackRef.current.style.transform = `translateX(${current + delta}px)`;
    }
  };

  return (
    <div className="relative mx-auto max-w-7xl px-6">
      {/* zone transparente */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* masques dégradés */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0B0F1A] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0B0F1A] to-transparent" />

        {/* Piste défilante */}
        <div
          ref={trackRef}
          className="flex gap-4 py-6 will-change-transform"
          style={{ transform: "translateX(0px)" }}
        >
          {list.map((t, i) => (
            <article
              key={i}
              className="min-w-[560px] max-w-[560px] rounded-xl border border-white/10 bg-white/[0.04] px-6 py-5 hover:bg-white/[0.06] transition"
            >
              <div className="flex items-center justify-between mb-3">
                <Stars count={t.stars} />
                <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400/70 shadow-[0_0_12px_rgba(236,72,153,.6)]" />
              </div>
              <p className="text-white/90 leading-relaxed">
                “{t.text}”
              </p>
              <p className="mt-3 text-sm text-white/60">
                {t.author} — {t.role}
              </p>
            </article>
          ))}
        </div>

        {/* Flèches latérales */}
        <button
          onClick={() => nudge("left")}
          aria-label="Précédent"
          className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/[0.05] border border-white/15 rounded-full h-12 w-12 flex items-center justify-center hover:bg-white/[0.1] hover:shadow-[0_0_12px_rgba(236,72,153,.4)] transition"
        >
          ←
        </button>
        <button
          onClick={() => nudge("right")}
          aria-label="Suivant"
          className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/[0.05] border border-white/15 rounded-full h-12 w-12 flex items-center justify-center hover:bg-white/[0.1] hover:shadow-[0_0_12px_rgba(236,72,153,.4)] transition"
        >
          →
        </button>
      </div>
    </div>
  );
}