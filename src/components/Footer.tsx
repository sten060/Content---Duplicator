// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-400 flex items-center justify-between">
        <span>© {new Date().getFullYear()} Zeno</span>
        <a href="/legal" className="hover:text-white">Termes légaux</a>
      </div>
    </footer>
  );
}