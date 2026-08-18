import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// A plain, cookie-free Supabase client for public (anon) reads. Unlike
// lib/supabase/server.ts, this doesn't touch next/headers' cookies(), so it
// can run at build time inside generateStaticParams as well as at request
// time — both matter here, since public property pages are statically
// generated. RLS's "anon" policies (see supabase/migrations) are what
// actually restrict this client to published rows; it never carries an
// authenticated session, by design.
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
