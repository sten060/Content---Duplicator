"use client";

import { useState, useTransition } from "react";

// Typage du retour attendu de ton action serveur
type ActionResult =
  | { ok: true; urls: string[]; error?: undefined }
  | { ok: false; error: any; urls?: undefined };

// Typage de la prop qu'on va passer
export type GenerateAction = (formData: FormData) => Promise<ActionResult>;

type Props = {
  action: GenerateAction;
};

export default function GenerateFormClient({ action }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [urls, setUrls] = useState<string[] | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        setUrls(null);

        // Appel de ton action serveur
        const res = await action(formData);

        if (res.ok) setUrls(res.urls ?? null);
        else setError(typeof res.error === "string" ? res.error : "Erreur inconnue");
      }}
      className="space-y-6"
    >
      {/* Exemple d'inputs */}
      <input type="file" name="files" multiple className="hidden" />

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-primary"
      >
        {isPending ? "Génération…" : "Générer"}
      </button>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      {urls && (
        <ul className="space-y-2">
          {urls.map((u) => (
            <li key={u}>
              <a href={u} target="_blank" rel="noreferrer" className="text-white/80 underline">
                {u}
              </a>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}