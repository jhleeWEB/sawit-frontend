import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  icon: Blob;
}
export default async function updateUserIcon({ icon }: Params) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const id = session.user.id;
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { data: uData, error: uError } = await supabase.storage
    .from("media")
    .upload(`public/user/icons/${id}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: true,
    });
  if (uError) {
    console.error(uError);
    return null;
  }
  const url = await supabase.storage.from("media").getPublicUrl(uData.path).data
    .publicUrl;

  const { data, error } = await supabase
    .from("users")
    .update({
      image: url,
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error(error);
    return null;
  }
  return data;
}
