import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";

export default async function postLikes(postId: number) {
  try {
    const session = await getSession();
    if (!session) {
      throw "no user session";
    }

    const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
    /**좋아요를 눌렀는지 확인 */
    const { data: existing } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .maybeSingle();

    /** 이미 눌렀으면 삭제하기 */
    if (existing) {
      await supabase.from("post_likes").delete().eq("id", existing.id);
      return "cancelled";
    } else {
      /** 안눌렀으니 추가히기*/
      await supabase.from("post_likes").insert({ post_id: postId });

      return "liked";
    }
  } catch (e) {
    console.error(e);
    return "error";
  }
}
