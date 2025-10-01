import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  community_id: number;
}
/*post id를 반환하는 요청입니다. */
export default async function postEnsure({ community_id }: Params) {
  try {
    const session = await getUserSession();
    if (!session) {
      console.error("Unauthorized");
      throw new Error("Unauthorized");
    }
    const uid = session.user.id;
    const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
    const { data: exist } = await supabase
      .from("posts")
      .select("id")
      .eq("owner_id", uid)
      .maybeSingle();

    /**기존 작성중인 드레프트 포스트가 없을 경우 */
    if (!exist) {
      //shell 레코드 생성하고 id 반환하기
      const { data: post_id, error } = await supabase
        .from("posts")
        .insert({
          title: "",
          text: "",
          community_id,
          status: "draft",
        })
        .select("id")
        .single();
      if (error) {
        console.error(error);
        throw error;
      }
      return post_id;
    }
    return exist.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}
