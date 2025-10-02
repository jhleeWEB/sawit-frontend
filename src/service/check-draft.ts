import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function checkDraft() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  //check draft
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("status", "draft")
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
