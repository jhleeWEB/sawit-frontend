"use server";
import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";
import { Post } from "./fetch_post";

export async function fetchRecentFeeds({
  pageSize = 20,
}: {
  pageSize: number;
  communityId?: number;
}): Promise<null | Post[]> {
  const supabase = getSupabaseClient() as SupabaseClient;

  const result = await supabase
    .from("posts")
    .select()
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(pageSize);

  if (result.error) {
    return null;
  }
  return result.data;
}

export async function fetchNextFeeds({
  lastCreatedAt,
  pageSize = 20,
}: {
  lastCreatedAt: string;
  pageSize?: number;
}): Promise<Post[] | null> {
  const supabase = getSupabaseClient() as SupabaseClient;
  const result = await supabase
    .from("posts")
    .select()
    .eq("status", "published")
    .lt("created_at", lastCreatedAt)
    .order("created_at", { ascending: false })
    .limit(pageSize);

  if (result.error) {
    return null;
  }
  return result.data;
}
