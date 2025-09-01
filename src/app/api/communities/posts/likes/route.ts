import { createSupabaseClient } from "@/lib/auth/supabase/server";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = await createSupabaseClient();

  const { post_id, community_id, user_id } = await req.json();
  const res = await supabase.from("post_likes").insert({
    post_id,
    community_id,
    user_id,
  });

  return new Response(res.data);
}
