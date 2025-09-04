import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";

export default function SupabaseClient() {
  const session = useSession();
  const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${session.data?.supabaseAccessToken}`,
        },
      },
    }
  );
  return client;
}
