import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
export default async function fetchIsCommunityMember(community_id: number) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { error } = await supabase
    .from("community_members")
    .select("owner_id")
    .eq("community_id", community_id)
    .eq("owner_id", session.user.id)
    .single();

  if (error) {
    return false;
  }
  return true;
}
