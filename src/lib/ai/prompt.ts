// src/lib/ai/prompt.ts
export const NEGATIVE_PROMPT =
  "nsfw, nudity, cleavage, veil, hat, hood, scarf, sunglasses, heavy makeup, extra fingers, extra arms, multiple people, duplicate body, deformed, disfigured, wide jaw, caricature, cartoon, anime, blur, out of focus, lowres, low quality, jpeg artifacts, watermark, text, logo, signature, weird teeth, bad skin, doll, plastic skin";

export function buildPrompt({
  decor,
  tenue,
  accessoires,
  style,
}: {
  decor?: string;
  tenue?: string;
  accessoires?: string;
  style?: string;
}) {
  return [
    // identité & cadrage figés
    "Ultra-photorealistic fashion photo of the SAME woman as the reference image.",
    "Keep EXACT same face, facial features, expression, head tilt, body pose, camera angle and framing.",
    "Keep the same left-arm pose and the phone in her hand visible.",

    // ce que l’utilisateur veut changer
    tenue ? `Outfit / clothing: ${tenue}.` : "",
    decor ? `Background / location: ${decor}.` : "",
    accessoires ? `Accessories / props: ${accessoires}.` : "",
    style ? `Global style / lighting: ${style}.` : "",

    // garde-fous
    "No new hats, veils, scarves or sunglasses.",
    "No extra people, no extra limbs, no hand duplication.",
    "No makeup changes, no hair style changes, no face morphing.",
    "Natural skin texture, realistic proportions, sharp eyes.",
    "SFW, neutral mood.",
  ]
    .filter(Boolean)
    .join(" ");
}