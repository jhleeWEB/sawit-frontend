import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";
export default async function fetchIsOwner(
  contentType: "community" | "post" | "comment",
  id: number
) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  switch (contentType) {
    case "community":
      const { error: cError } = await supabase
        .from("community_members")
        .select("owner_id")
        .eq("community_id", id)
        .eq("owner_id", session.user.id)
        .single();

      if (cError) {
        return false;
      }
      return true;

    case "post":
      const { error: pError } = await supabase
        .from("posts")
        .select("id")
        .eq("owner_id", session.user.id)
        .single();

      if (pError) {
        return false;
      }
      return true;
    case "comment":
      const { error: cmError } = await supabase
        .from("post_comments")
        .select("id")
        .eq("owner_id", session.user.id)
        .single();

      if (cmError) {
        return false;
      }
      return true;
  }
}
