import { createSupabaseClient } from "@/lib/auth/supabase/server";

export async function fetchRecentFeeds(pageSize = 20) {
  const supabase = await createSupabaseClient();
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
  const supabase = await createSupabaseClient();
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
