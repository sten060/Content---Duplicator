import SimilarityClient from "./SimilarityClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Params = { score?: string; err?: string };

export default async function SimilarityPage({
  searchParams,
}: {
  searchParams: Promise<Params>;
}) {
  const params = await searchParams;
  const score = params?.score ? Number(params.score) : undefined;
  const err = params?.err ? decodeURIComponent(params.err) : undefined;

  return (
    <main className="relative p-6 md:p-10 max-w-4xl mx-auto space-y-8">
      <div className="fixed top-0 left-56 right-0 h-[500px] pointer-events-none"
           style={{ background: "radial-gradient(800px 400px at 50% -100px, rgba(16,185,129,.10), transparent 70%)" }} />
      <h1 className="text-3xl font-extrabold tracking-tight">Comparateur de similarité</h1>
      <p className="text-sm text-white/50">Comparez deux images ou vidéos. Le score indique à quel point les contenus se ressemblent.</p>
      <div className="h-px bg-white/[0.06]" />
      <SimilarityClient initialScore={score} initialErr={err} />
    </main>
  );
}
