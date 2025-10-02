import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  key: string;
}
export default async function getPublicUrl({ key }: Params) {
  try {
    const session = await getUserSession();
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
