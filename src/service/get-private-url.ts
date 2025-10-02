import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  key: string;
}
export default async function getPrivateUrl({ key }: Params) {
  try {
    const session = await getUserSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
    const { data, error: uError } = await supabase.storage
      .from("media")
      .createSignedUrl(key, 60 * 30);

    if (uError) {
      throw uError;
    }
    return data.signedUrl;
  } catch (error) {
    console.error(error);
    return null;
  }
}
