// src/app/dashboard/page.tsx
import Link from 'next/link';
import { duplicate, deleteAll, listOutputs } from './actions';

export const dynamic = 'force-dynamic'; // on veut recharger la liste après actions

export default async function DashboardPage() {
  const files = await listOutputs();

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Content Duplicator</h1>

      {/* Actions globales */}
      <div className="flex gap-3">
        <form action={deleteAll}>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Tout effacer
          </button>
        </form>

        <a
          href="/api/out/zip"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          Télécharger tout (.zip)
        </a>
      </div>

      {/* Formulaire de duplication */}
      <form action={duplicate} className="grid gap-4 max-w-xl">
        <div>
          <label className="block text-sm font-medium mb-1">Choisir un fichier</label>
          <input name="file" type="file" required className="block w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nombre de copies</label>
          <input
            name="count"
            type="number"
            min={1}
            max={20}
            defaultValue={3}
            className="block w-32"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white"
        >
          Dupliquer
        </button>
      </form>

      {/* Liste des fichiers générés */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Fichiers générés</h2>
        {files.length === 0 ? (
          <p className="text-sm opacity-70">Aucun fichier généré pour l’instant.</p>
        ) : (
          <ul className="space-y-1">
            {files.map((href) => (
              <li key={href}>
                <Link className="text-blue-400 hover:underline" href={href}>
                  {href.split('/').pop()}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}