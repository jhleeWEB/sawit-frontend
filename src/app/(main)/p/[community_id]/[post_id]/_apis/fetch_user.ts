import { createSupabaseClient } from "@/lib/auth/supabase/server";

export default async function fetchOwnerInfo(
  owner_id: string
): Promise<null | PostOwner> {
  const supabase = await createSupabaseClient();
  const { data: userData, error } = await supabase
    .from("users")
    .select("name, image")
    .eq("id", owner_id)
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return userData;
}

interface PostOwner {
  name: string;
  image: string;
}
