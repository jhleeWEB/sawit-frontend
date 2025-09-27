import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";

import { getSession } from "next-auth/react";
export default async function joinCommunity(id: number) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("community_members")
    .insert({
      community_id: id,
      role: "member",
    })
    .select("id")
    .single();

  if (error) {
    return null;
  }
  return data;
}
