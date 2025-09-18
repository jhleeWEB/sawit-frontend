import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";

interface Params {
  post_id?: number;
}

export default async function fetchPostMedia({
  post_id,
}: Params): Promise<null | Pick<PostMedia, "id" | "url" | "path">[]> {
  if (!post_id) {
    return null;
  }
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = await createSupabaseClient(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("post_media")
    .select()
    .eq("post_id", post_id);
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

interface PostMedia {
  id: number;
  created_ad: string;
  owner_id: string;
  post_id: number;
  ext: string;
  mime: string;
  url: string;
  path: string;
  size: number;
}
