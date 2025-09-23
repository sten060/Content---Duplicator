// src/app/dashboard/page.tsx
import { duplicate, deleteAll } from "./actions";

/**
 * Adapteurs "action" côté page qui ne retournent rien (void),
 * pour satisfaire le typage Next/TS des <form action={...}>.
 * NE PAS mettre "use server" en haut du fichier !
 */
async function duplicateAction(formData: FormData): Promise<void> {
  "use server";
  await duplicate(formData); // ta vraie logique reste dans ./actions
}

async function deleteAllAction(): Promise<void> {
  "use server";
  await deleteAll(); // idem
}

export default function DashboardPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard – Duplication</h1>

      {/* Formulaire de duplication */}
      <form
        action={duplicateAction}
        className="border rounded p-4 mb-8 space-y-4"
        encType="multipart/form-data"
      >
        <label className="block">
          <span className="text-sm font-medium">Choisir un fichier</span>
        </label>
        <input
          type="file"
          name="file"
          required
          className="block mt-1 border rounded p-2 w-full"
        />

        <label className="block mt-4">
          <span className="text-sm font-medium">Nombre de copies</span>
        </label>
        <input
          type="number"
          name="count"
          defaultValue={3}
          min={1}
          max={10}
          className="block mt-1 border rounded p-2 w-24"
        />

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dupliquer
        </button>
      </form>

      {/* Bouton pour tout supprimer */}
      <form action={deleteAllAction}>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Supprimer toutes les copies
        </button>
      </form>
    </main>
  );
}