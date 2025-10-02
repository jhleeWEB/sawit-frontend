import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
export default async function fetchIsOwner(
  contentType: "community" | "post" | "comment",
  id: number
) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  switch (contentType) {
    case "community":
      const { error: cError } = await supabase
        .from("communities")
        .select("owner_id")
        .eq("id", id)
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
        .from("comments")
        .select("id")
        .eq("owner_id", session.user.id)
        .single();

      if (cmError) {
        return false;
      }
      return true;
  }
}
