import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchCommunity(
  community_id: number
): Promise<null | CommunityInfo> {
  const supabase = await createSupabaseClient();
  const { data: commInfo, error } = await supabase
    .from("communities")
    .select("name, icon_url")
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return commInfo;
}

interface CommunityInfo {
  name: string;
  icon_url: string;
}
