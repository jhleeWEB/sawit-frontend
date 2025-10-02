import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

interface Params {
  name: string;
  description?: string;
  icon?: Blob;
  banner?: Blob;
  topics?: string[];
  community_id: number;
}

export default async function updateCommunity({
  name,
  description,
  icon,
  banner,
  topics,
  community_id,
}: Params) {
  const session = await getUserSession();

  if (!session) {
    console.error("now user session");
    return null;
  }

  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);

  //insert community
  const { data: community, error: communityError } = await supabase
    .from("communities")
    .update({
      name,
      description,
      topics,
    })
    .eq("id", community_id)
    .select()
    .single();

  if (communityError) {
    /** 중복 애러 */
    if (communityError.code === "23505") {
      console.error("중복이름");
    }
    return null;
  }

  const publicUrls = [];
  if (banner) {
    const { data, error } = await supabase.storage
      .from("media")
      .upload(`public/community/banners/${community.id}`, banner, {
        contentType: banner.type,
        upsert: true,
      });
    if (error) {
      console.error(error);
      return null;
    }
    const url = await supabase.storage.from("media").getPublicUrl(data.path)
      .data.publicUrl;
    publicUrls.push(url);
  }

  if (icon) {
    const { data, error } = await supabase.storage
      .from("media")
      .upload(`public/community/icons/${community.id}`, icon, {
        contentType: icon.type,
        upsert: true,
      });
    if (error) {
      console.error(error);
      return null;
    }
    const url = await supabase.storage.from("media").getPublicUrl(data.path)
      .data.publicUrl;
    publicUrls.push(url);
  }

  supabase
    .from("communities")
    .update({
      banner_url: publicUrls[0],
      icon_url: publicUrls[1],
    })
    .eq("id", community.id);

  return community;
}
