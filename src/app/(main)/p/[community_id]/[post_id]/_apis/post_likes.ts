import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";

export default async function postLikes(postId: string) {
  try {
    const session = await getSession();
    if (!session) {
      throw "no user session";
    }
    const supabase = await createSupabaseClient(session.supabaseAccessToken);
    const { data: existing } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .maybeSingle();

    if (existing) {
      const { data: cancelled } = await supabase
        .from("post_likes")
        .delete()
        .eq("id", existing.id);
      return cancelled;
    } else {
      const { data: liked } = await supabase
        .from("post_likes")
        .insert({ post_id: postId })
        .select()
        .single();
      return liked;
    }
  } catch (e) {
    console.error(e);
    return;
  }
}
