import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchCommunity(
  id: string
): Promise<Omit<Community, "id"> | null> {
  const supabase = await createSupabaseClient();
  const { data: community, error } = await supabase
    .from("communities")
    .select(
      "created_at, name, description, banner_url, icon_url, topics, member_count, post_count"
    )
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
  post_count: number;
}
