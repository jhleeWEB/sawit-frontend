import { createSupabaseClient } from "@/lib/auth/supabase/server";
/**
 * function: post_comment_subtree
 * parameters: root_id: root post id
 * return:*/
export default async function fetchComments(
  postId: number
): Promise<Comment[] | null> {
  const supabase = await createSupabaseClient();
  const { data, error } = await supabase
    .from("post_comments")
    .select()
    .eq("post_id", postId)
    .eq("depth", 0)
    .limit(10);

  if (error) {
    return null;
  }
  return data;
}

export interface Comment {
  id: string;
  parent_id: string;
  is_edited: boolean;
  created_at: string;
  updated_at: string;
  post_id: number;
  owner_id: string;
  owner_username: string;
  owner_icon: string;
  comment: string;
  likes: number;
  dislikes: number;
  path: string;
  depth: number;
}
