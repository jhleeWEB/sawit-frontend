import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * function: post_comment_subtree
 * parameters: root_id: root post id
 * return:*/
export default async function fetchComments(
  postId: number
): Promise<Comment[] | null> {
  const supabase = getSupabaseClient() as SupabaseClient;
  const session = await getUserSession();
  const { data, error } = await supabase.rpc("post_comments_with_replies", {
    p_post_id: postId,
    p_limit: 1000,
    p_offset: 0,
  });
  if (error) {
    return null;
  }
  //se isOwner property to comment object
  const userId = session?.user.id;
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
  post_title: string;
  owner_id: string;
  owner_username: string;
  owner_icon: string;
  comment: string;
  likes: number;
  dislikes: number;
  path: string;
  depth: number;
  community_icon: string;
  community_name: string;
  community_id: number;

  //only in client
  isOwner?: boolean;
}
