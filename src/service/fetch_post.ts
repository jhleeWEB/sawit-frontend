import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchPost(post_id: number, community_id: number) {
  try {
    const supabase = await createSupabaseClient();
    const { data: postData, error } = await supabase
      .from("posts")
      .select()
      .eq("id", post_id)
      .eq("community_id", community_id)
      .single<Post>();

    if (error) {
      return null;
    }

    return postData;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export interface Post {
  id: number;
  type: string;
  title: string;
  created_at: string;
  expires_at: string;
  text?: string;
  media_urls: string[];
  community_id: number;
  community_name: string;
  community_icon: string;
  owner_id: string;
  owner_username: string;
  owner_icon: string;
  likes: number;
  dislikes: number;
  comments: number;
}
