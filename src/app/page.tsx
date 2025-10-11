// src/app/page.tsx
import "@/app/globals.css";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="card-soft flex items-center gap-4">
      <div className="neon-icon-pink">{icon}</div>
      <div>
        <div className="text-2xl font-semibold">{value}</div>
        <div className="text-white/70 text-sm">{label}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="text-white">
      {/* ===== HERO ===== */}
      <section className="container-zeno pt-16 pb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-center">
  <span className="text-white">Crée une fois,</span><br />
  <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
    Zeno le multiplie 100 fois.
  </span>
</h1>

<p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-center">
  Une seule base, des centaines de versions uniques.  
  Zeno duplique, ajuste et prépare ton contenu pour chaque plateforme —  
  sans perte de qualité, sans effort.
</p>
        {/* Espace pour ta vidéo (tu peux y glisser un <video /> ou un composant) */}
        <div className="mt-8 card-soft h-[360px] flex items-center justify-center text-white/50">
          Zone vidéo (démo produit) — 16:9
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link href="/product" className="btn-primary-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500">
            Voir les offres
          </Link>
          <Link href="/product" className="btn btn-ghost">
            Découvrir le produit
          </Link>
        </div>
      </section>

      <hr className="divider" />

      {/* ===== POURQUOI ZENO ===== */}
      <section className="container-zeno">
        <h2 className="h2 mb-6 text-center">Pourquoi choisir Zeno</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Stat
            icon={
              /* Utilisateur */
              <svg width="28" height="28" viewBox="0 0 24 24" className="neon-icon-pink">
                <path fill="currentColor" d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5" />
                <path fill="currentColor" d="M4 20a8 8 0 0 1 16 0Z" />
              </svg>
            }
            value="120+"
            label="agences actives"
          />
          <Stat
            icon={
              /* Trending */
              <svg width="28" height="28" viewBox="0 0 24 24" className="neon-icon-pink">
                <path fill="currentColor" d="M3 17v2h18v-2H3Zm1-6l4 4l4-4l4 4l5-5l-1.4-1.4l-3.6 3.6l-4-4l-4 4l-2.6-2.6z" />
              </svg>
            }
            value="+38%"
            label="revenus moyens en 30 jours"
          />
          <Stat
            icon={
              /* Star */
              <svg width="28" height="28" viewBox="0 0 24 24" className="neon-icon-pink">
                <path fill="currentColor" d="m12 17.27l6.18 3.73l-1.64-7.03L21 9.24l-7.19-.61L12 2L10.19 8.63L3 9.24l4.46 4.73L5.82 21z" />
              </svg>
            }
            value="4.9/5"
            label="note utilisateurs"
          />
        </div>
      </section>

      <hr className="divider" />

{/* ===== FONCTIONNALITÉS PRINCIPALES ===== */}
<section className="container-zeno flex flex-col md:flex-row items-center gap-12 py-12">
  {/* Texte descriptif */}
  <div className="flex-1 space-y-6">
    <h2 className="text-4xl md:text-5xl font-bold neon-title">
      Comment Zeno BOOST ton contenu
    </h2>
    <p className="text-white/70 text-lg leading-relaxed">
      Zeno est ton <span className="text-white">laboratoire de duplication et d’automatisation</span>.
      Chaque outil est pensé pour te faire gagner du temps, éliminer les erreurs et scaler
      sans perdre en qualité. Voici comment :
    </p>

    {/* Points clés */}
    <div className="space-y-6 mt-8">
      <div className="relative pl-8">
        <span className="absolute left-0 top-1 text-fuchsia-500 text-xl">✦</span>
        <h3 className="text-xl font-semibold text-white mb-1">Duplication intelligente</h3>
        <p className="text-white/70 leading-relaxed">
          Zeno génère automatiquement des versions uniques de tes contenus : ajustement des
          dimensions, recompression, métadonnées et EXIF. Tes visuels sont prêts à être postés,
          sans duplication détectable.
        </p>
      </div>

      <div className="relative pl-8">
        <span className="absolute left-0 top-1 text-indigo-400 text-xl">✦</span>
        <h3 className="text-xl font-semibold text-white mb-1">Ré-encodage vidéo ultra-léger</h3>
        <p className="text-white/70 leading-relaxed">
          Le module vidéo modifie les signatures techniques (FPS, bitrate, GOP, hash)
          tout en préservant le rendu. Idéal pour réutiliser un même contenu sur Reels, TikTok
          ou Shorts sans blocage d’algorithme.
        </p>
      </div>

      <div className="relative pl-8">
        <span className="absolute left-0 top-1 text-emerald-400 text-xl">✦</span>
        <h3 className="text-xl font-semibold text-white mb-1">Détection de similarité</h3>
        <p className="text-white/70 leading-relaxed">
          Compare visuellement tes fichiers et leurs métadonnées pour repérer les doublons
          ou variations trop proches. Zeno te donne un score de similarité précis
          pour garder un workflow propre.
        </p>
      </div>

      <div className="relative pl-8">
        <span className="absolute left-0 top-1 text-purple-400 text-xl">✦</span>
        <h3 className="text-xl font-semibold text-white mb-1">Variantes IA</h3>
        <p className="text-white/70 leading-relaxed">
          Génére des versions inédites de tes images en un clic, tout en préservant ton identité
          visuelle. Ajuste la lumière, la texture ou le ton global sans altérer le style
          de ton créateur ou de ta marque.
        </p>
      </div>

      <div className="relative pl-8">
        <span className="absolute left-0 top-1 text-pink-400 text-xl">✦</span>
        <h3 className="text-xl font-semibold text-white mb-1">Export & pipeline simplifié</h3>
        <p className="text-white/70 leading-relaxed">
          Tout ton flux est centralisé : tu importes, modifies, contrôles et exportes en lot.
          Le système gère les métadonnées, noms de fichiers et formats pour toi.
        </p>
      </div>
    </div>
  </div>

  {/* Illustration visuelle (à remplacer par ton image ou vidéo) */}
  <div className="flex-1">
    <div className="relative aspect-video rounded-3xl overflow-hidden glass border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 blur-3xl" />
      <div className="absolute inset-0 flex items-center justify-center text-white/70">
        <span>🎬 Aperçu du dashboard (bientôt)</span>
      </div>
    </div>
  </div>
</section>

{/* ===== CE QUI REND ZENO UNIQUE ===== */}
<section className="container-zeno text-center py-20">
  <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
    <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(147,51,234,0.25)]">
      Ce qui rend Zeno unique
    </span>
  </h2>
  <p className="text-white/60 max-w-2xl mx-auto text-lg leading-relaxed">
    Zeno allie la précision technique à la créativité assistée par IA.
    Une seule plateforme pour tout gérer, dupliquée, optimisée et prête à performer.
  </p>
</section>

{/* ===== ZENO ESSENCE ===== */}
<section className="container-zeno grid md:grid-cols-2 gap-8 py-12">
  {/* Bloc Duplication */}
  <article className="card-soft border-white/10 hover:border-fuchsia-500/30 transition-all duration-300 p-8 rounded-2xl">
    <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
      Duplication parfaite
    </h3>
    <p className="text-white/70 leading-relaxed">
      Zeno reconstruit chaque fichier pour qu’il reste unique — dimensions, EXIF, bitrate, signature hash.
      <br />Aucune trace, aucune détection, aucun blocage.
    </p>
    <p className="text-white/50 mt-4 text-sm">
      Visuels et vidéos prêts à poster, 100% conformes, 0 friction.
    </p>
  </article>

  {/* Bloc IA */}
  <article className="card-soft border-white/10 hover:border-indigo-500/30 transition-all duration-300 p-8 rounded-2xl">
    <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
      IA créative pour les agences
    </h3>
    <p className="text-white/70 leading-relaxed">
      L’IA Zeno génère des variantes naturelles et cohérentes.
      <br />Même identité, nouveaux angles, zéro répétition.
    </p>
    <p className="text-white/50 mt-4 text-sm">
      Tu scales sans équipe supplémentaire, sans perte de qualité.
    </p>
  </article>
</section>

      <hr className="divider" />

      {/* ===== FAQ (accordéon) ===== */}
      <section className="container-zeno">
        <h2 className="h2 mb-6 text-center">FAQ</h2>
        <FAQ
          items={[
            {
              q: "Zeno, c’est pour qui ?",
              a: "Agences social, créateurs, équipes marketing. Tu veux du rendu propre, consistant et rapide sans bricolage : c’est pour toi.",
            },
            {
              q: "Puis-je annuler à tout moment ?",
              a: "Oui. Résiliation en 1 clic depuis ton espace. Ton accès reste actif jusqu’à la fin de la période en cours.",
            },
            {
              q: "Quelles plateformes sont supportées ?",
              a: "Images & vidéos classiques, presets prêts pour Reels, TikTok, Shorts. Les exports sont optimisés pour chaque format.",
            },
            {
              q: "Comment se passe l’onboarding ?",
              a: "Tu crées ton compte, tu choisis un plan, tu as l’accès immédiat 7j/7. Une mini-démo (vidéo) est dispo dans le dashboard.",
            },
          ]}
        />
      </section>

      <hr className="divider" />

      {/* ===== Avis (slider auto + étoiles) ===== */}
      <section className="container-zeno pb-16">
        <Testimonials />
        <div className="text-center mt-8">
          <Link href="/product" className="btn-primary-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500">
            Voir les offres
          </Link>
        </div>
      </section>
    </main>
  );
}