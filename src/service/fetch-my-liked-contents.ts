import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";

export default async function fetchMyLikedContents(userId: string) {
  const supabase = getSupabaseClient();
  const { data: cData, error: cError } = await supabase
    .from("comment_likes")
    .select()
    .eq("owner_id", userId);
  if (cError) {
    return null;
  }
  const { data: pData, error: pError } = await supabase
    .from("post_likes")
    .select()
    .eq("owner_id", userId);
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
