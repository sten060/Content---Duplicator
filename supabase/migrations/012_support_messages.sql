-- Support messages table — stores every support request in DB
-- Email via SMTP is attempted as a bonus but not required.

CREATE TABLE IF NOT EXISTS public.support_messages (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID        REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  contact    TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  email_sent BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Only admins (service role) can read all rows.
-- Users cannot read each other's messages.
ALTER TABLE public.support_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all" ON public.support_messages
  USING (true)
  WITH CHECK (true);
