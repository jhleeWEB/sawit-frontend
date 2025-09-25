import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";

export default async function fetchCommunitySearchList(searchword: string) {
  const session = await getSession();
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
