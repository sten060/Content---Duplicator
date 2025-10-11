// src/lib/ai/enhance.ts
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN!;
if (!REPLICATE_TOKEN) throw new Error("Missing REPLICATE_API_TOKEN");

export async function enhanceImage({
  imageUrl,
  restore = 0.7,
  smooth = 0.5,
}: {
  imageUrl: string;
  restore?: number; // puissance d'amélioration
  smooth?: number;  // douceur / lissage
}): Promise<string> {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${REPLICATE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: "cb6be3ac270df3c7ff36b23b9aee3bba9d764f9e6f55e7b40f49e18b014c8d8e", // tencentarc/gfpgan
      input: {
        img: imageUrl,
        version: "v1.4",
        upscale: 1,
        codeformer_fidelity: restore, // entre 0.3 (fort lissage) et 1.0 (très fidèle)
        smooth: smooth, // entre 0 (aucun lissage) et 1 (peau très lisse)
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Replicate error: ${text}`);
  }

  const result = await response.json();
  const pollUrl = result.urls?.get;

  // Attendre la fin du traitement
  while (true) {
    const r = await fetch(pollUrl, { headers: { Authorization: `Token ${REPLICATE_TOKEN}` } });
    const data = await r.json();
    if (data.status === "succeeded") {
      return data.output[0];
    }
    if (data.status === "failed") {
      throw new Error(data.error || "Enhancement failed");
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
}