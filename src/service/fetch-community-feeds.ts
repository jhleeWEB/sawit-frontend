import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

export async function fetchCommunityFeeds({
  pageSize,
  communityId,
}: {
  pageSize: number;
  communityId: number;
}) {
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data: feeds, error } = await supabase
    .from("posts")
    .select()
    .eq("community_id", communityId)
    .order("created_at", { ascending: false })
    .limit(pageSize);

  if (error) {
    console.error(error);
    return null;
  }
  return feeds;
}
export async function fetchNextCommunityFeeds({
  lastCreatedAt,
  pageSize,
  communityId,
}: {
  lastCreatedAt: string;
  pageSize: number;
  communityId: number;
}) {
  "use server";
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data: feeds, error } = await supabase
    .from("posts")
    .select()
    .lt("created_at", lastCreatedAt)
    .eq("community_id", communityId)
    .order("created_at", { ascending: false })
    .limit(pageSize);

  if (error) {
    console.error(error);
    return null;
  }
  return feeds;
}
