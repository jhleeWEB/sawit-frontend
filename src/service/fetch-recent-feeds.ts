import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { Post } from "./fetch_post";

export async function fetchRecentFeeds(pageSize = 20): Promise<null | Post[]> {
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(pageSize);
  if (error) {
    return null;
  }
  return data;
}

export async function fetchNextFeeds(
  lastCreatedAt: string,
  lastId: string,
  pageSize = 20
) {
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("status", "published")
    .or(
      `created_at.lt.${lastCreatedAt},and(created_at.eq.${lastCreatedAt},id.lt.${lastId})`
    )
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .limit(pageSize);
  if (error) {
    return null;
  }
  return data;
}
