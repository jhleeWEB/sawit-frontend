import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function fetchCommunityFeeds(communityId: number) {
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data: feeds, error } = await supabase
    .from("posts")
    .select()
    .eq("community_id", communityId)
    .order("created_at", { ascending: true });
  if (error) {
    console.error(error);
    return null;
  }
  return feeds;
}
