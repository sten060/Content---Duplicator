import Toasts from "../Toasts";
import ImageFormClient from "./ImageFormClient";
import { listOutImages } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ImagesPage({ searchParams }: { searchParams?: { ok?: string; err?: string } }) {
  const initialImages = await listOutImages();
  const ok = Boolean(searchParams?.ok);
  const err = searchParams?.err ? decodeURIComponent(searchParams.err) : undefined;

  return (
    <main className="p-6 space-y-8">
      <Toasts ok={ok} err={err} />

      <h1 className="text-3xl font-extrabold tracking-tight">Duplication Images</h1>

      <ImageFormClient initialImages={initialImages} />
    </main>
  );
}
