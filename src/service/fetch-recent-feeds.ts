import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Post } from "./fetch_post";
import { FeedType } from "@/components/feed-section";

export async function fetchRecentFeeds({
  pageSize = 20,
  feedType = "recent",
  communityId,
}: {
  pageSize: number;
  feedType?: FeedType;
  communityId?: number;
}): Promise<null | Post[]> {
  const supabase = getSupabaseClient() as SupabaseClient;
  let result;
  switch (feedType) {
    case "community":
      result = await supabase
        .from("posts")
        .select()
        .eq("status", "published")
        .eq("community_id", communityId)
        .order("created_at", { ascending: false })
        .limit(pageSize);
    default:
      result = await supabase
        .from("posts")
        .select()
        .eq("status", "published")
        .order("created_at", { ascending: false })
        .limit(pageSize);
  }
  if (result.error) {
    return null;
  }
  return result.data;
}

export async function fetchNextFeeds({
  lastCreatedAt,
  pageSize = 20,
  feedType = "recent",
  communityId,
}: {
  lastCreatedAt: string;
  pageSize?: number;
  feedType?: FeedType;
  communityId?: number;
}): Promise<Post[] | null> {
  const supabase = getSupabaseClient() as SupabaseClient;
  let result;
  switch (feedType) {
    case "community":
      await supabase
        .from("posts")
        .select()
        .eq("status", "published")
        .eq("community_id", communityId)
        .lt("created_at", lastCreatedAt)
        .order("created_at", { ascending: false })
        .limit(pageSize);
    default:
      result = await supabase
        .from("posts")
        .select()
        .eq("status", "published")
        .lt("created_at", lastCreatedAt)
        .order("created_at", { ascending: false })
        .limit(pageSize);
  }

  if (result.error) {
    return null;
  }
  return result.data;
}
