import { getSupabaseClient } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { SupabaseClient } from "@supabase/supabase-js";

interface Params {
  username?: string;
  id?: string | number;
}

export default async function fetchUser({
  username,
  id,
}: Params): Promise<User | null> {
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
  } else if (id) {
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
  } else {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const supabaseServer = getSupabaseClient();
    const { data, error } = await supabaseServer
      .from("users")
      .select()
      .eq("id", session.user.id)
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    console.log(error);
    return data;
  }
}

export interface User {
  id: string;
  created_at: string;
  username: string;
  email: string;
  image: string;
  post_count: number;
  comment_count: number;
  community_count: number;
}
