import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { Comment } from "../fetch_comments";

interface Params {
  post_id: number;
  comment: string;
  parent_id?: number;
}

export default async function publishComment(
  params: Params
): Promise<null | Comment> {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("comments")
    .insert({
      ...params,
    })
    .select()
    .single();

  if (error) {
    return null;
  }
  return data;
}
