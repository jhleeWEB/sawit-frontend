import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";
import { Comment } from "./fetch_comments";

export default async function fetchMyComments(
  owner_id: string
): Promise<Comment[] | null> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("owner_id", owner_id);
  if (error) {
    return null;
  }
  return data;
}
