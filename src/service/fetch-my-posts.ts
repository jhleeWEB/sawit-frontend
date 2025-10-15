import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { Post } from "./fetch_post";

export default async function fetchMyPosts(
  username: string
): Promise<Post[] | null> {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("owner_username", username);
  if (error) {
    return null;
  }
  return data;
}
