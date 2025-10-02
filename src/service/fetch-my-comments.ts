import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { Comment } from "./fetch_comments";

export default async function fetchMyComments(
  username: string
): Promise<Comment[] | null> {
  const session = await getUserSession();

  if (!session) {
    return null;
  }

  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("owner_username", username);

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
