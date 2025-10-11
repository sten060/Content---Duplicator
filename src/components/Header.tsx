"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// composant pour gérer les liens avec effet "souligné"
function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "group relative px-3 py-2 rounded-lg transition",
        active ? "text-white" : "text-white/80 hover:text-white",
      ].join(" ")}
    >
      {label}
      {/* Soulignement gradient (hover + actif) */}
      <span
        className={[
          "pointer-events-none absolute left-2 right-2 -bottom-1 h-[2px] rounded-full",
          "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          "transition-opacity",
        ].join(" ")}
      />
    </Link>
  );
}

// ============================
// HEADER PRINCIPAL
// ============================

export default function Header() {
  return (
    <div className="sticky top-4 z-40">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="glass flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl"
          style={{ boxShadow: "0 8px 30px rgba(0,0,0,.35)" }}
        >
          {/* === LOGO CLIQUABLE === */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Zeno Studio Logo"
              width={36}
              height={36}
              priority
              className="drop-shadow-[0_0_12px_rgba(147,51,234,0.5)] hover:opacity-90 transition"
            />
            <span className="text-xl md:text-[20px] font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(147,51,234,0.25)]">
                Zeno
              </span>
              <span className="text-white/80"> Studio</span>
            </span>
          </Link>

          {/* === NAVIGATION CENTRALE === */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink href="/" label="Accueil" />
            <NavLink href="/product" label="Produit" />
            <NavLink href="/legal" label="Mentions" />
          </nav>

          {/* === ACTIONS À DROITE === */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:inline-flex btn border border-white/15 bg-white/5 hover:bg-white/10 text-white/90"
            >
              Se connecter
            </Link>
            <Link
              href="/register"
              className="btn text-white shadow bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-indigo-400 hover:to-fuchsia-400"
            >
              S’inscrire
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}