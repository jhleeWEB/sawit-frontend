import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function postLikes(postId: number) {
  try {
    const session = await getUserSession();
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
