-- ============================================================
-- Migration 006 : corriger la contrainte profiles_plan_check
--
-- La contrainte profiles_plan_check n'autorisait pas la valeur
-- 'solo', causant un Supabase update error code 23514 et
-- empêchant l'activation de l'abonnement après paiement.
-- ============================================================

-- Supprimer l'ancienne contrainte (quelle que soit sa définition actuelle)
ALTER TABLE public.profiles
  DROP CONSTRAINT IF EXISTS profiles_plan_check;

-- Remettre à NULL les éventuelles valeurs de plan invalides
-- (ex: 'free', 'starter', ou autre valeur d'une ancienne version)
-- afin de ne pas bloquer l'ajout de la nouvelle contrainte.
UPDATE public.profiles
  SET plan = NULL
  WHERE plan IS NOT NULL AND plan NOT IN ('solo', 'pro');

-- Recréer avec les deux plans valides + NULL autorisé
-- (NULL = utilisateur sans abonnement actif, ce qui est la valeur par défaut)
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_plan_check
    CHECK (plan IS NULL OR plan IN ('solo', 'pro'));
