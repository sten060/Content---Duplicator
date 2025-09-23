// src/app/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClientServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createClientServer();

  // Auth guard
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const bucket = process.env.SUPABASE_BUCKET!;
  // Liste des fichiers du bucket
  const { data: files, error } = await supabase.storage.from(bucket).list("", {
    limit: 200,
    sortBy: { column: "created_at", order: "desc" },
  });

  if (error) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Content Duplicator</h1>
        <p className="text-red-500">Erreur listing: {error.message}</p>
      </main>
    );
  }

  const fileList = files ?? [];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Content Duplicator</h1>

      {/* Actions (ZIP / Clear) */}
      <div className="flex gap-3">
        <Link
          href="/api/out/zip"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Télécharger tout (.zip)
        </Link>
        <Link
          href="/api/out/clear"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Tout effacer
        </Link>
      </div>

      {/* Note duplication */}
      <div className="p-3 rounded bg-yellow-50 border text-yellow-800">
        La duplication (ffmpeg/exiftool) ne tourne pas sur Vercel.
        On affichera ici les fichiers générés par le worker (à venir).
      </div>

      {/* Liste */}
      {fileList.length === 0 ? (
        <p className="text-gray-400">Aucun fichier généré pour l’instant.</p>
      ) : (
        <ul className="space-y-2">
          {fileList.map((f) => {
            const { data } = supabase.storage.from(bucket).getPublicUrl(f.name);
            const url = data.publicUrl;
            return (
              <li key={f.name}>
                <a className="text-blue-600 underline" href={url} target="_blank">
                  {f.name} {f.metadata?.size ? `(${(f.metadata.size/1024/1024).toFixed(1)} MB)` : ""}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}