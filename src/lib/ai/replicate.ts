// src/lib/ai/replicate.ts
import { buildPrompt } from "@/lib/ai/prompt";

const NEGATIVE_PROMPT =
  "nsfw, nudity, cleavage, transparent fabric, veil, hat, hood, scarf, sunglasses, heavy makeup, extra fingers, extra arms, multiple people, duplicate body, deformed, disfigured, long chin, wide jaw, caricature, cartoon, anime, blur, out of focus, lowres, low quality, jpeg artifacts, watermark, text, logo, signature, weird teeth, bad skin, plastic skin, doll";
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!REPLICATE_TOKEN) {
  throw new Error("Missing REPLICATE_API_TOKEN env var");
}


/**
 * 🔁 Put the Replicate model version ID here (Instant-ID).
 * Keep the value you already verified on the model's Versions tab.
 */
const MODEL_VERSION =
  "2e4785a4d80dadf580077b2244c8d7c05d8e3faac04a04c02d8e099dd2876789";

/* ----------------------------- Helpers ----------------------------- */

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function withExtraSfw(prompt: string) {
  const sfwGuard =
    "Strictement SFW. Tenue couvrante, pas de peau visible, pas de suggestion. " +
    "Aucune connotation sexuelle, ambiance neutre.";
  return `${prompt}. ${sfwGuard}`;
}

/* ------------------------------ Types ------------------------------ */

type RunOnceArgs = {
  imageUrl: string;    // full reference image
  prompt: string;      // user prompt (already built)
  numOutputs: number;  // 1..n (Instant-ID usually returns 1)
};

/* ------------------------ Single create + poll --------------------- */

async function runOnce({
  imageUrl,
  prompt,
  numOutputs,
}: RunOnceArgs): Promise<string[]> {
  // 1) Create prediction
  const create = await fetch("https://api.replicate.com/v1/predictions", {
  method: "POST",
  headers: {
    Authorization: `Token ${REPLICATE_TOKEN}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  version: MODEL_VERSION,
  input: {
  // on envoie la même image 2x pour verrouiller POSE + VISAGE
  image: imageUrl,       // composition / pose / cadrage (garde le téléphone)
  face_image: imageUrl,  // identité visage

  // prompt utilisateur
  prompt,
  negative_prompt: NEGATIVE_PROMPT,

  // réglages qui maximisent "même visage + même cadre"
  ip_adapter_scale: 0.97,  // 0.90–0.98 = très fidèle au visage
  strength: 0.22,          // 0.18–0.30 = très peu de changements structuraux
  guidance_scale: 3.2,     // 3–4 = modéré, évite les ajouts parasites
  num_inference_steps: 42, // un peu plus de steps = meilleure qualité

  // format portrait réaliste (comme ton image originale selfie)
  width: 896,
  height: 1152,

  // stabilité (facultatif)
  seed: 123456,
},
  }),
});
    if (!create.ok) {
  const text = await create.text().catch(() => "");
  throw new Error(`Replicate create failed: ${create.status} ${text}`);
}

  const created = await create.json();
  const pollUrl: string | undefined = created?.urls?.get;
  if (!pollUrl) {
    throw new Error("Réponse Replicate invalide (pas d'URL de polling).");
  }

  // 2) Poll until done
  let status: string = created.status;
  let output: unknown = created.output;

  while (status === "starting" || status === "processing" || status === "queued") {
    await sleep(1500);
    const r = await fetch(pollUrl, {
      headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
    });
    if (!r.ok) {
      const t = await r.text().catch(() => "");
      throw new Error(`Replicate poll failed: ${r.status} ${t}`);
    }
    const json = await r.json();
    status = json.status;
    output = json.output;

    if (status === "failed" || status === "canceled") {
      const err = json?.error || `Replicate status: ${status}`;
      throw new Error(String(err));
    }
  }

  // 3) Normalize output -> array of URLs
  const urls: string[] = Array.isArray(output)
    ? output.map(String)
    : output
    ? [String(output)]
    : [];

  // Some Instant-ID builds ignore numOutputs; if you asked for >1, we just
  // duplicate the single result to match the UI expectation.
  if (urls.length === 1 && numOutputs > 1) {
    return Array.from({ length: numOutputs }, () => urls[0]);
  }
  return urls;
}

/* ----------------------------- Public API -------------------------- */

export async function generateImage({
  imageUrl,
  prompt,
  numOutputs = 1,
}: {
  imageUrl: string;
  prompt: string;
  numOutputs?: number;
}): Promise<string[]> {
  try {
    // tentative normale
    return await runOnce({ imageUrl, prompt, numOutputs });
  } catch (e: any) {
    const msg = String(e?.message || e || "");
    // retry automatique si le provider bloque pour "NSFW"
    if (msg.toLowerCase().includes("nsfw")) {
      const safePrompt = withExtraSfw(prompt);
      return await runOnce({ imageUrl, prompt: safePrompt, numOutputs });
    }
    throw e;
  }
}