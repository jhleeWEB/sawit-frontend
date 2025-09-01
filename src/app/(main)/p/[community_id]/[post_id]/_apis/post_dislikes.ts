import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function postDislikes(
  postId: string,
  communityId: string,
  email: string
) {
  try {
    const supabase = await createSupabaseClient();

    const { error } = await supabase
      .from("post_dislikes")
      .insert({
        post_id: postId,
        community_id: communityId,
        email: email,
      })
      .select();
    if (error) {
      if (error.code === "23505") {
        /** already pressed disliked
         *  cancel it
         */
        await supabase.from("post_dislikes").delete().match({
          post_id: postId,
          community_id: communityId,
          email: email,
        });
        return "cancelled";
      } else {
        throw error;
      }
    }
    return "success";
  } catch (e) {
    console.error(e);
    return "failed";
  }
}
