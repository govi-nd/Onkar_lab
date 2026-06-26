import { createClient } from "@supabase/supabase-js";

let clientInstance: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (clientInstance) return clientInstance;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL;
  const supabaseServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase server environment variables");
  }

  clientInstance = createClient(supabaseUrl, supabaseServiceKey);
  return clientInstance;
}

// Export a Proxy that behaves exactly like the Supabase client,
// but evaluates/instantiates the client lazily at runtime when a property is accessed.
// This prevents build-time compilation/module evaluation crashes on platforms like Vercel.
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(target, prop) {
    const client = getClient();
    const value = Reflect.get(client, prop);
    if (typeof value === "function") {
      return value.bind(client);
    }
    return value;
  },
});
