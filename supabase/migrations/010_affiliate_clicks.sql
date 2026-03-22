-- ============================================================
-- Migration 010 : tracking des clics sur les liens d'affiliation
-- ============================================================

CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_code TEXT        NOT NULL REFERENCES public.affiliates(code) ON DELETE CASCADE,
  clicked_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour les requêtes de stats par code
CREATE INDEX IF NOT EXISTS affiliate_clicks_code_idx
  ON public.affiliate_clicks (affiliate_code);

-- RLS : lecture uniquement par l'affilié propriétaire
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "affiliates_see_own_clicks"
  ON public.affiliate_clicks FOR SELECT
  USING (
    affiliate_code = (
      SELECT code FROM public.affiliates WHERE user_id = auth.uid() LIMIT 1
    )
  );
