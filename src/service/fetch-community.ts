import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

export default async function fetchCommunity(
  id: number
): Promise<Community | null> {
  const supabase = getSupabaseClient() as SupabaseClient;
  const { data: community, error } = await supabase
    .from("communities")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return community;
}

export interface Community {
  id: number;
  created_at: string;
  name: string;
  description: string;
  banner_url: string;
  icon_url: string;
  topics: string[];
  member_count: number;
  owner_id: string;
  owner_icon: string;
  owner_username: string;
  post_count: number;
}
