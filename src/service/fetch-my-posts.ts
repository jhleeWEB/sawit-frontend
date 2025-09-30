import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";
import { Post } from "./fetch_post";

export default async function fetchMyPosts(
  owner_id: string
): Promise<Post[] | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", owner_id);
  if (error) {
    return null;
  }
  return data;
}
