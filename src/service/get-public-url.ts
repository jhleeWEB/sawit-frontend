import { createSupabaseClient } from "@/lib/auth/supabase/server";
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
    const supabase = await createSupabaseClient(session.supabaseAccessToken);
    const publicUrl = supabase.storage.from("media").getPublicUrl(key)
      .data.publicUrl;

    return publicUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
