// Client-safe: pas d'event handler custom, uniquement des <Link>
import Link from "next/link";

const featuresStarter = [
  "Accès immédiat 7j/7",
  "Images & vidéos supportées",
  "Préréglages IG / TikTok",
  "Téléchargement ZIP",
  "Support par email",
];

const featuresPro = [
  "Tout le Starter",
  "500+ duplicas / mois",
  "Tous formats & presets avancés",
  "Historique 90 jours",
  "Analytics basiques",
  "Support prioritaire",
];

export default function Pricing() {
  return (
    <section id="pricing" className="container-zeno pt-10 pb-16">
      <div className="text-center mb-8">
        <h2 className="h2">Choisis ton plan</h2>
        <p className="mt-2 text-white/70">
          Paiement sécurisé par Stripe. Accès instantané après achat.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* --- Plan Starter --- */}
        <article
          className="relative glass border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/[0.06] transition"
        >
          {/* halo discret */}
          <div
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(closest-side, var(--zeno-indigo), transparent)" }}
          />
          <header className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Starter</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15">
              Idéal pour démarrer
            </span>
          </header>

          <div className="mt-4 flex items-end gap-1">
            <span className="text-4xl font-bold">100€</span>
            <span className="text-white/60 mb-1 text-sm">/mois</span>
          </div>

          <ul className="mt-5 space-y-2 text-sm">
            {featuresStarter.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l3.1 3.1 6.5-6.5a1 1 0 0 1 1.4 0z"/>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link href="/checkout?plan=starter" className="btn btn-primary w-full mt-6">
            Commencer
          </Link>
        </article>

        {/* --- Plan Pro (mise en avant) --- */}
        <article
          className="relative glass border border-white/10 rounded-2xl p-6 overflow-hidden hover:bg-white/[0.06] transition"
          style={{ boxShadow: "0 0 0 1px rgba(255,255,255,.06), 0 20px 60px rgba(99,102,241,.20)" }}
        >
          {/* ruban “Populaire” */}
          <div className="absolute -right-8 top-6 rotate-12">
            <span className="px-3 py-1 text-[11px] font-semibold rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-md">
              Plus populaire
            </span>
          </div>

          {/* halo discret */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(closest-side, var(--zeno-fuchsia), transparent)" }}
          />

          <header className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Pro</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/15">
              Pour scaler
            </span>
          </header>

          <div className="mt-4 flex items-end gap-1">
            <span className="text-4xl font-bold">189€</span>
            <span className="text-white/60 mb-1 text-sm">/mois</span>
          </div>

          <ul className="mt-5 space-y-2 text-sm">
            {featuresPro.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.2 7.2a1 1 0 0 1-1.4 0L3.3 9.1a1 1 0 1 1 1.4-1.4l3.1 3.1 6.5-6.5a1 1 0 0 1 1.4 0z"/>
                </svg>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Link href="/checkout?plan=pro" className="btn btn-primary w-full mt-6">
            Choisir Pro
          </Link>
        </article>
      </div>

      {/* Confiance / rassurance */}
      <div className="mt-8 grid md:grid-cols-4 gap-4 text-sm">
        <div className="glass p-4 text-center">🔒 Paiement sécurisé Stripe</div>
        <div className="glass p-4 text-center">⚡ Accès instantané après achat</div>
        <div className="glass p-4 text-center">📆 7j/7 — support par email</div>
        <div className="glass p-4 text-center">❌ Résiliation en 1 clic</div>
      </div>
    </section>
  );
}