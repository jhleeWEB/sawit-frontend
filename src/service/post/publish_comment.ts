import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";
import { Comment } from "../fetch_comments";

interface Params {
  post_id: number;
  comment: string;
  parent_id?: number;
}

export default async function publishComment(
  params: Params
): Promise<null | Comment> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("post_comments")
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
