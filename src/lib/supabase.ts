import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const supabaseConfigured = Boolean(url && key);

// When the env vars are missing the marketing site still works; forms and the
// portal show a "not connected" message instead of failing.
export const supabase: SupabaseClient = createClient(
  url ?? "http://localhost:54321",
  key ?? "missing-anon-key",
  { auth: { persistSession: supabaseConfigured, autoRefreshToken: supabaseConfigured } },
);
