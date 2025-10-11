// src/components/FAQ.tsx
"use client";
import { useState } from "react";

export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="card-soft">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left"
              aria-expanded={isOpen}
            >
              <span className="font-medium">{it.q}</span>
              <span className={`transition ${isOpen ? "rotate-180" : ""}`}>⌄</span>
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-white/70 mt-3">{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}