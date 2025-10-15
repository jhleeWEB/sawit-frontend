import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function fetchCommunitySearchList(searchword: string) {
  const session = await getUserSession();
  if (!session) {
    return [];
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data: communityList, error } = await supabase
    .from("communities")
    .select("id, name, icon_url, topics")
    .ilike("name", `%${searchword}%`);

  if (error) {
    console.error(error);
    return [];
  }
  return communityList as CommunityAutocompleteList[];
}

export interface CommunityAutocompleteList {
  id: number;
  name: string;
  icon_url: string;
  topics: string[] | [];
}
