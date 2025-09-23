// src/app/dashboard/page.tsx
import { duplicate, deleteAll } from "./actions";

export default function DashboardPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard – Duplication</h1>

      {/* Formulaire de duplication */}
      <form
        action={duplicate}
        className="border rounded p-4 mb-8 space-y-4"
        encType="multipart/form-data"
      >
        <label className="block">
          <span className="text-sm font-medium">Choisir un fichier</span>
          <input
            type="file"
            name="file"
            required
            className="block mt-1 border rounded p-2 w-full"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Nombre de copies</span>
          <input
            type="number"
            name="count"
            defaultValue={3}
            min={1}
            max={10}
            className="block mt-1 border rounded p-2 w-24"
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dupliquer
        </button>
      </form>

      {/* Bouton pour tout supprimer */}
      <form action={deleteAll}>
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