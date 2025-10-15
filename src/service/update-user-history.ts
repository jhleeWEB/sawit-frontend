import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
export default async function updateUserHistory(post_id: number) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("user_history")
    .insert({ post_id })
    .select("id")
    .single();
  if (error) {
    return null;
  }
  return data;
}
