import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getNextAuthSession from "@/lib/next-auth/get-next-auth-session";

interface Params {
  post_id?: number;
}

export default async function fetchPostMedia({
  post_id,
}: Params): Promise<null | PostMedia[]> {
  if (!post_id) {
    return null;
  }

  const session = await getNextAuthSession();

  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
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

export interface PostMedia {
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
