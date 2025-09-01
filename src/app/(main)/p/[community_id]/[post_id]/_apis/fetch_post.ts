import { createSupabaseClient } from "@/lib/auth/supabase/server";

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

export interface Post {
  id: string;
  title: string;
  created_at: Date;
  text?: string;
  file_uris: string[];
  community_id: number;
  likes: number;
  dislikes: number;
}
