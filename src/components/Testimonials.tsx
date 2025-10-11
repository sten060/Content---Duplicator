// src/components/Testimonials.tsx
"use client";
import { useEffect, useRef, useState } from "react";

const DATA = [
  { name: "Mika CEO", role: "Growth Manager", stars: 5, text: "Zeno a clarifié notre pipeline et accéléré nos cycles. Moins d’erreurs, plus de sorties." },
  { name: "Bilal S.", role: "Head of Social", stars: 5, text: "Nos reposts cross-plateformes passent crème et on gagne un temps fou sur l’export." },
  { name: "Kilian D.", role: "SrkAgency", stars: 5, text: "Interface lisible, règles standard intégrées, onboarding rapide pour l’équipe." },
  { name: "Marco R.", role: "Agency Owner", stars: 5, text: "Résultats nets, cohérents. Les clients perçoivent mieux la qualité, ça convertit mieux." },
];

export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // auto défilement linéaire
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % DATA.length), 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    track.current?.scrollTo({ left: idx * (track.current.clientWidth * 0.92), behavior: "smooth" });
  }, [idx]);

  return (
    <div className="relative">
      <div ref={track} className="snap-x snap-mandatory overflow-x-auto scrollbar-none">
        <div className="flex gap-4 w-[200%] md:w-[180%]">
          {DATA.map((t, i) => (
            <article key={i} className="card-soft min-w-[92%] md:min-w-[60%] snap-center">
              {/* étoiles */}
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" className="text-amber-400">
                    <path fill="currentColor" d="m12 17.27l6.18 3.73l-1.64-7.03L21 9.24l-7.19-.61L12 2l-1.81 6.63L3 9.24l4.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>
              <p className="text-lg">{t.text}</p>
              <p className="text-white/60 mt-3 text-sm">{t.name} — {t.role}</p>
            </article>
          ))}
        </div>
      </div>

      {/* flèches */}
      <div className="flex items-center justify-center gap-3 mt-4">
        <button onClick={() => setIdx((p) => (p - 1 + DATA.length) % DATA.length)} aria-label="Précédent" className="btn btn-ghost">←</button>
        <button onClick={() => setIdx((p) => (p + 1) % DATA.length)} aria-label="Suivant" className="btn btn-ghost">→</button>
      </div>
    </div>
  );
}