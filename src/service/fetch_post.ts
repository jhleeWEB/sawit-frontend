import { PostTabOption } from "@/app/(main)/p/[community_id]/create/_components/post-form";
import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";

export default async function fetchPost(post_id: number) {
  try {
    const supabase = getSupabaseClient() as SupabaseClient;
    const { data: postData, error } = await supabase
      .from("posts")
      .select()
      .eq("id", post_id)
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
  type: PostTabOption;
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
