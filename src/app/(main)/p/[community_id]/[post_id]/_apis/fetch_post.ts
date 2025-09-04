import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { Post } from "../../create/_apis/create-new-post";

export default async function fetchPost(post_id: string, community_id: string) {
  try {
    const supabase = await createSupabaseClient();
    const res = await supabase
      .from("posts")
      .select()
      .eq("id", post_id)
      .eq("community_id", community_id)
      .single<Post>();
    if (res.data) {
      return res.data;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
