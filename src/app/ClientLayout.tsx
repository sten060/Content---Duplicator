"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import Header from "@/components/Header";

const PROMO_TEXT = "À l'occasion de la nouvelle version plus optimale de DuupFlow mise à jour récemment — Profite de -15% sur ton abonnement avec le code FLOW15";

function PromoBar() {
  // Duplicate text for seamless infinite loop
  const items = Array(6).fill(PROMO_TEXT);
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-11 flex items-center overflow-hidden select-none"
      style={{ background: "linear-gradient(90deg,#4f46e5,#6366f1,#818cf8,#6366f1,#4f46e5)" }}
    >
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: "promo-scroll 45s linear infinite",
          willChange: "transform",
        }}
      >
        {items.map((text, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-10 text-[13.5px] font-medium text-white/90">
            <span className="text-white/40">✦</span>
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes promo-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function AffiliateRefTracker() {
  const searchParams = useSearchParams();
  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      const code = ref.toUpperCase();
      localStorage.setItem("duupflow_ref", code);
      fetch("/api/affiliate/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }).catch(() => {});
    }
  }, [searchParams]);
  return null;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isAffiliatePage = pathname.startsWith("/affiliate") || pathname.startsWith("/admin");
  const showHeader = !isDashboard && !isAuthPage && !isAffiliatePage;

  return (
    <>
      {/* ── Background: animated liquid glass top + original gradient bottom ── */}

      {/* Base dark layer */}
      <div className="fixed inset-0 -z-20 pointer-events-none" style={{ background: "#060c1e" }} />

      {/* Animated liquid glass blobs — DuupFlow logo colors */}
      <div className="fixed inset-0 -z-19 pointer-events-none overflow-hidden" style={{ zIndex: -19 }}>
        <style>{`
          @keyframes liquid-a { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-60px) scale(1.08)} 66%{transform:translate(-30px,40px) scale(0.95)} }
          @keyframes liquid-b { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,30px) scale(1.12)} 66%{transform:translate(30px,-40px) scale(0.92)} }
        `}</style>
        <div className="absolute top-[-10%] left-[5%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(26,58,171,0.8) 0%, transparent 70%)", animation: "liquid-a 14s ease-in-out infinite" }} />
        <div className="absolute top-[5%] right-[0%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full blur-[90px]"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.7) 0%, transparent 70%)", animation: "liquid-b 17s ease-in-out infinite" }} />
        <div className="absolute top-[15%] left-[25%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full blur-[110px]"
          style={{ background: "radial-gradient(circle, rgba(45,92,232,0.65) 0%, transparent 70%)", animation: "liquid-a 20s ease-in-out infinite 3s" }} />
        <div className="absolute top-[-5%] left-[45%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px]"
          style={{ background: "radial-gradient(circle, rgba(112,176,248,0.5) 0%, transparent 70%)", animation: "liquid-b 12s ease-in-out infinite 1s" }} />
        <div className="absolute top-[10%] left-[35%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)", animation: "liquid-a 16s ease-in-out infinite 2s" }} />
      </div>

      {/* Fade: liquid glass → original gradient */}
      <div className="fixed inset-0 -z-18 pointer-events-none" style={{
        zIndex: -18,
        background: "linear-gradient(180deg, transparent 0%, transparent 40%, #060c1e 65%)",
      }} />

      {/* Original gradient for lower sections */}
      <div className="fixed inset-0 -z-17 pointer-events-none" style={{
        zIndex: -17,
        background: "linear-gradient(180deg, transparent 0%, transparent 55%, #0c1c80 70%, #1535c0 80%, #2d6ae8 90%, #70b0f8 100%)",
      }} />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 -z-16 pointer-events-none"
        style={{
          zIndex: -16,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      {/* Dark overlay */}
      <div
        className="fixed inset-0 -z-15 pointer-events-none"
        style={{
          zIndex: -15,
          background: "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <Suspense fallback={null}>
        <AffiliateRefTracker />
      </Suspense>
      {showHeader && <div className="hidden md:block"><PromoBar /></div>}
      {showHeader && <Header />}
      {showHeader && <div className="h-16 md:h-[calc(50px+5rem)]" />}
      {children}
    </>
  );
}
