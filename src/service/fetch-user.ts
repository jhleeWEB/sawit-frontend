import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";

interface Params {
  username?: string;
  id?: string | number;
}

export default async function fetchUser({ username, id }: Params) {
  const supabase = getSupabaseClient() as SupabaseClient;
  if (username) {
    const { data: userInfo, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single<User>();
    if (error) {
      console.error(error);
      return null;
    }
    return userInfo;
  }
  if (id) {
    const { data: userInfo, error } = await supabase
      .from("users")
      .select()
      .eq("id", id)
      .single<User>();
    if (error) {
      console.error(error);
      return null;
    }
    return userInfo;
  }
  return null;
}

export interface User {
  id: string;
  created_at: string;
  username: string;
  email: string;
  image: string;
  post_count: number;
  comment_count: number;
}
