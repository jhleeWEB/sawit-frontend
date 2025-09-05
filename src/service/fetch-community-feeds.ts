import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchCommunityFeeds(communityId: string) {
  const supabase = await createSupabaseClient();
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
