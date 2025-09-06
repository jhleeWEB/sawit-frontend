import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchCommunity(
  id: string
): Promise<Community | null> {
  const supabase = await createSupabaseClient();
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
  id: string;
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
