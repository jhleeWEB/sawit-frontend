import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function fetchMyContents() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const id = session.user.id;
  const supabase = getSupabaseClient();
  const { data: cData, error: cError } = await supabase
    .from("comments")
    .select()
    .eq("owner_id", id);
  if (cError) {
    return null;
  }
  const { data: pData, error: pError } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", id);
  if (pError) {
    return null;
  }

  const results = [...cData, ...pData];
  results.sort(
    (a, b) =>
      new Date(a.created_at).getMilliseconds() -
      new Date(b.created_at).getMilliseconds()
  );

  return results;
}
