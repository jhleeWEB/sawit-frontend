import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchPost(post_id: string, community_id: string) {
  try {
    const supabase = await createSupabaseClient();
    const res = await supabase
      .from("posts")
      .select()
      .eq("id", post_id)
      .eq("community_id", community_id);
    if (res.data) {
      return res.data[0];
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
    return [];
  }
}
