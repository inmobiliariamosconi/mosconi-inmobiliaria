"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "./database.types";

// One client per browser tab is enough; consumers call this each time they
// need it rather than caching a module-level singleton, since createBrowserClient
// already reuses the underlying connection/session internally.
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
