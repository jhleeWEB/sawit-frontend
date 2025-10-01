import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function fetchLikes(postId: string, userId: string) {
  try {
    const supabase = getSupabaseClient() as SupabaseClient;

    const { data: likes, error: likesError } = await supabase
      .from("post_likes")
      .select()
      .match({
        post_id: postId,
        user_id: userId,
      });

    const { data: dislikes, error: dislikesError } = await supabase
      .from("post_dislikes")
      .select()
      .match({
        post_id: postId,
        user_id: userId,
      });

    if (likesError) {
      throw likesError;
    }
    if (dislikesError) {
      throw dislikesError;
    }
    const totalLikes = likes.length - dislikes.length;
    return totalLikes;
  } catch (e) {
    console.error(e);
    return 0;
  }
}
