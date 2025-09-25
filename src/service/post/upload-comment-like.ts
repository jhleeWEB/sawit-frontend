import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";
export default async function uploadCommentLike({
  commentId,
}: {
  commentId: number;
}) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data: existing } = await supabase
    .from("comment_likes")
    .select("id")
    .eq("id", commentId)
    .maybeSingle();

  /** 이미 눌렀으면 삭제하기 */
  if (existing) {
    await supabase.from("comment_likes").delete().eq("id", existing.id);
    return "cancelled";
  } else {
    /** 안눌렀으니 추가히기*/
    await supabase.from("comment_likes").insert({ comment_id: commentId });

    return "liked";
  }
}
