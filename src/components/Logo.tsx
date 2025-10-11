// src/components/Logo.tsx
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`font-extrabold tracking-tight ${className}`}>
      <span className="bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(90deg, var(--zeno-indigo), var(--zeno-fuchsia))" }}>
        Zeno
      </span>
      <span className="text-white/60"> Studio</span>
    </div>
  );
}