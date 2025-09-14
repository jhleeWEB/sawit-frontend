import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";

export default async function postLikes(postId: number) {
  try {
    const session = await getSession();
    if (!session) {
      throw "no user session";
    }
    const supabase = await createSupabaseClient(session.supabaseAccessToken);
    const { data: existing } = await supabase
      .from("post_dislikes")
      .select("id")
      .eq("post_id", postId)
      .maybeSingle();

    if (existing) {
      await supabase.from("post_dislikes").delete().eq("id", existing.id);
      return "cancelled";
    } else {
      await supabase.from("post_dislikes").insert({ post_id: postId });
      return "disliked";
    }
  } catch (e) {
    console.error(e);
    return "error";
  }
}
