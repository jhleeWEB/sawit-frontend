import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import { getSession } from "next-auth/react";

interface Params {
  key: string;
}
export default async function getPublicUrl({ key }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
    const publicUrl = await supabase.storage.from("media").getPublicUrl(key)
      .data.publicUrl;

    return publicUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
