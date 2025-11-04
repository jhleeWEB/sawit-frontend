import { PostTabOption } from "@/app/(main)/c/[community_id]/create/_components/post-form";
import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function fetchPost(post_id: number) {
  try {
    const supabase = getSupabaseClient() as SupabaseClient;
    const { data: postData, error } = await supabase
      .from("posts")
      .select(
        `*,
        community:communities!posts_community_id_fkey(icon_url, name, id)
        `,
      )
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

// export interface PostModel {
//   id: number;
//   type: PostTabOption;
//   title: string;
//   created_at: string;
//   expires_at: string;
//   text?: string;
//   media_urls: string[];
//   community: {
//     id: number;
//     icon_url: string;
//     name: string;
//   };
//   owner: {
//     id: string;
//     username: string;
//     icon: string;
//   };
//   likes: number;
//   dislikes: number;
//   comments: number;
// }

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
  is_private: boolean;
  is_spoiler: boolean;
  is_nsfw: boolean;
  owner_id: string;
  owner_username: string;
  owner_icon: string;
  likes: number;
  dislikes: number;
  comments: number;
}
