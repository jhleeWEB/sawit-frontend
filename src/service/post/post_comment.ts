import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";
import { Comment } from "../fetch_comments";

interface Params {
  post_id: number;
  comment: string;
  parent_id?: number;
}

export default async function postComment(
  params: Params
): Promise<null | Comment> {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = await createSupabaseClient(session.supabaseAccessToken);
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
