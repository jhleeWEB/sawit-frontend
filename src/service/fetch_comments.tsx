import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";
/**
 * function: post_comment_subtree
 * parameters: root_id: root post id
 * return:*/
export default async function fetchComments(
  postId: number
): Promise<Comment[] | null> {
  const supabase = await createSupabaseClient();
  const session = await getSession();
  const { data, error } = await supabase.rpc("post_comments_with_replies", {
    p_post_id: postId,
    p_limit: 1000,
    p_offset: 0,
  });
  if (error || !session) {
    return null;
  }
  //se isOwner property to comment object
  const userId = session.user.id;
  const dataWithIsOwner = (data as Comment[]).map((n) => {
    if (n.owner_id === userId) {
      return {
        ...n,
        isOwner: true,
      };
    } else {
      return n;
    }
  });
  return dataWithIsOwner;
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
  //only in client
  isOwner?: boolean;
}
