import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";

import getUserSession from "@/lib/auth/supabase/get-user-session";
export default async function joinCommunity(id: number) {
  const session = await getUserSession();
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
