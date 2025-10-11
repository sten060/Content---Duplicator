// src/app/product/page.tsx
import "@/app/globals.css";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";

function Plan({
  title,
  price,
  tagline,
  features,
  cta,
}: {
  title: string;
  price: string;
  tagline: string;
  features: string[];
  cta: { label: string; href: string };
}) {
  return (
    <div className="card-soft relative">
      <div className="text-white/70 text-sm mb-2">{tagline}</div>
      <h3 className="text-2xl font-semibold">{title}</h3>
      <div className="mt-2 text-3xl font-semibold">{price}<span className="text-base font-normal">/mois</span></div>

      <ul className="mt-4 space-y-2 text-white/85">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="neon-icon-pink mt-1">
              <svg width="18" height="18" viewBox="0 0 20 20"><path fill="currentColor" d="m8 13l-3-3l1.4-1.4L8 10.2l4.6-4.6L14 7z"/></svg>
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={cta.href}
        className="mt-6 inline-flex btn-primary-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500"
      >
        {cta.label}
      </Link>
    </div>
  );
}

function ModuleCard({ title, color, lines }: { title: string; color: "pink"|"blue"|"green"|"mix"; lines: string[] }) {
  const gradient =
    color === "pink" ? "from-fuchsia-500 to-pink-500" :
    color === "blue" ? "from-indigo-400 to-blue-500" :
    color === "green" ? "from-emerald-400 to-teal-400" :
    "from-fuchsia-500 via-purple-500 to-indigo-500";

  return (
    <article className="card-soft">
      <h3 className={`text-2xl md:text-3xl mb-3 bg-gradient-to-r ${gradient} bg-clip-text text-transparent text-shadow`}>
        {title}
      </h3>
      <ul className="space-y-2 text-white/80">
        {lines.map((l, i) => <li key={i}>• {l}</li>)}
      </ul>
    </article>
  );
}

export const revalidate = false;

export default function ProductPage() {
  return (
    <main className="text-white">
      {/* Plans */}
      <section className="container-zeno pt-14">
        <h1 className="h1 text-center mb-2">Deux offres simples</h1>
        <p className="lead text-center mb-8">Tu commences maintenant, tu peux évoluer quand tu veux.</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Plan
            title="Starter"
            price="100€"
            tagline="Parfait pour démarrer"
            features={[
              "Accès immédiat 7j/7",
              "Images & vidéos supportées",
              "Préréglages IG/TikTok",
              "Téléchargement ZIP",
              "Support par email",
            ]}
            cta={{ label: "Choisir Starter", href: "/register" }}
          />
          <Plan
            title="Pro"
            price="189€"
            tagline="Plus populaire"
            features={[
              "Tout le Starter",
              "500+ duplicas / mois",
              "Tous formats & presets avancés",
              "Historique 90 jours & analytics",
              "Support prioritaire",
            ]}
            cta={{ label: "Choisir Pro", href: "/register" }}
          />
        </div>

        {/* garanties / rassurance */}
        <div className="grid sm:grid-cols-4 gap-4 mt-6">
          {[
            ["Paiement sécurisé Stripe"],
            ["Accès immédiat après achat"],
            ["7j/7 — support par email"],
            ["Résiliation en 1 clic"],
          ].map(([txt], i) => (
            <div key={i} className="card-soft flex items-center gap-2 py-3">
              <span className="neon-icon-pink">
                <svg width="18" height="18" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill="currentColor" /></svg>
              </span>
              <span className="text-white/80 text-sm">{txt}</span>
            </div>
          ))}
        </div>

        <p className="text-white/70 text-center mt-6">
          Après l’achat, ton compte est activé <strong>instantanément</strong>. Accès complet 7j/7, export illimité selon ton quota, historique et support continu. Tu peux changer d’offre à tout moment.
        </p>
      </section>

      <hr className="divider" />

      {/* Modules inclus */}
      <section className="container-zeno">
        <h2 className="h2 text-center mb-6">Les modules inclus</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard
            title="Duplication Images"
            color="pink"
            lines={[
              "Variantes uniques (dimensions, recompression, EXIF, micro-variations)",
              "Look préservé, duplication prête à poster",
              "Batch en lot, contrôle qualité visuel",
            ]}
          />
          <ModuleCard
            title="Duplication Vidéos"
            color="blue"
            lines={[
              "Ré-encodage léger (FPS, GOP, bitrate, timebase, hash)",
              "Préserve l’apparence, modifie la signature technique",
              "Sorties prêtes pour Reels, TikTok, Shorts",
            ]}
          />
          <ModuleCard
            title="Détecteur de similarité"
            color="green"
            lines={[
              "Compare médias + métadonnées, note claire",
              "Réduit les doublons, sécurise les variations",
              "Décisions nettes, tri rapide",
            ]}
          />
          <ModuleCard
            title="Génération IA"
            color="mix"
            lines={[
              "Crée automatiquement des variantes sans casser l’identité visuelle",
              "Contrôles sobres, rendu propre",
              "Idéal quand tu veux aller plus loin",
            ]}
          />
        </div>

        <p className="text-white/70 mt-8">
          Zeno combine duplication maîtrisée, contrôle qualité et outils IA pour t’offrir un pipeline
          sans friction : tu importes, tu règles, tu vérifies, tu exportes. Propre, lisible, et calibré
          pour les plateformes. Idéal pour scaler sans perdre en cohérence.
        </p>
      </section>

      <hr className="divider" />

      {/* Avis + FAQ */}
      <section className="container-zeno">
        <Testimonials />
      </section>

      <hr className="divider" />

      <section className="container-zeno pb-16">
        <h2 className="h2 mb-6 text-center">FAQ</h2>
        <FAQ
          items={[
            { q: "Comment tester Zeno ?", a: "Choisis un plan et commence. Tu peux changer/annuler quand tu veux." },
            { q: "Puis-je inviter mon équipe ?", a: "Oui sur le plan Pro (multi-membres) avec historique & analytics." },
            { q: "Quels formats vidéo ?", a: "Classiques web & sociaux. Les presets gèrent FPS/GOP/bitrate/timebase." },
            { q: "Support ?", a: "Email 7j/7. Sur Pro : prioritaire." },
          ]}
        />
      </section>
    </main>
  );
}