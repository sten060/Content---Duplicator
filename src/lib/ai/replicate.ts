// src/lib/ai/replicate.ts
import Replicate from "replicate";

if (!process.env.REPLICATE_API_TOKEN) {
  throw new Error("Missing REPLICATE_API_TOKEN (set it in .env.local or Render).");
}
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function generateImage({
  prompt,
  imageUrl,
  numOutputs = 2,
}: {
  prompt: string;
  imageUrl?: string;
  numOutputs?: number;
}): Promise<string[]> {
  const input: Record<string, any> = {
    prompt,
    num_outputs: numOutputs,
  };
  if (imageUrl) input.image = imageUrl;

  const out = await replicate.run(
    // modèle de ton choix; en exemple:
    "adirik/realistic-vision-v6.0:57a9c68d91ab4b02a3fdb7fbd41405e7f9d0a8cbcd3cf4f2a0130a57373c05e7",
    { input }
  );

  // La plupart des modèles renvoient string[] (URLs). Adapte si besoin.
  return Array.isArray(out) ? (out as string[]) : [];
}