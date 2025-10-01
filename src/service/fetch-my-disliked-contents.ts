import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function fetchMyDislikedContents() {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const id = session.user.id;
  const supabase = getSupabaseClient();
  const { data: cData, error: cError } = await supabase
    .from("comment_dislikes")
    .select()
    .eq("owner_id", id);
  if (cError) {
    return null;
  }
  const { data: pData, error: pError } = await supabase
    .from("post_dislikes")
    .select()
    .eq("owner_id", id);
  if (pError) {
    return null;
  }

  const sorted = [...cData, ...pData];
  sorted.sort(
    (a, b) =>
      new Date(a.created_at).getMilliseconds() -
      new Date(b.created_at).getMilliseconds()
  );

  const promises = sorted.map((n) => {
    if (n.comment_id) {
      return supabase
        .from("comments")
        .select()
        .eq("id", n.comment_id)
        .eq("owner_id", n.owner_id)
        .single();
    } else {
      return supabase
        .from("posts")
        .select()
        .eq("id", n.post_id)
        .eq("owner_id", n.owner_id)
        .single();
    }
  });

  const results = (await Promise.all(promises)).map((n) => n.data);

  return results;
}
