import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  name: string;
  community_id: number;
  description?: string;
}

export default async function saveCommunityGuideline({
  name,
  description,
  community_id,
}: Params) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data, error } = await supabase
    .from("community_guidelines")
    .insert({
      name,
      description,
      community_id,
    })
    .select("id")
    .eq("community_id", community_id);

  if (error) {
    console.error(error);
    return null;
  }
  // update community
  await supabase
    .from("communities")
    .update({ guidelines: data.map((n) => n.id) })
    .eq("id", community_id)
    .single();

  return data;
}
