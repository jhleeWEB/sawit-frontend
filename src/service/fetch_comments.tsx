import { createSupabaseClient } from "@/lib/auth/supabase/server";
/**
 * function: post_comment_subtree
 * parameters: root_id: root post id
 * return:*/
export default async function fetchComments(
  postId: number
): Promise<Comment[] | null> {
  const supabase = await createSupabaseClient();

  const { data, error } = await supabase.rpc("post_comments_with_replies", {
    p_post_id: postId,
    p_limit: 10,
    p_offset: 0,
  });

  //   const { data, error } = await supabase
  //     .from("post_comments")
  //     .select()
  //     .eq("post_id", postId)
  //     .eq("depth", 0)
  //     .limit(10);
  console.log(data);
  if (error) {
    return null;
  }
  return data;
}

export interface Comment {
  id: number;
  parent_id: number;
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
