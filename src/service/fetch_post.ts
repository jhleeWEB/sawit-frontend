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
  id: number;
  title: string;
  created_at: string;
  text?: string;
  media: string[];
  community_id: number;
  community_name: string;
  community_icon: string;
  owner_id: string;
  owner_username: string;
  owner_icon: string;
  likes: number;
  dislikes: number;
}
