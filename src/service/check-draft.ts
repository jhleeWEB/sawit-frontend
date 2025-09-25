import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";

export default async function checkDraft() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  //check draft
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("status", "draft")
    .single();
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
