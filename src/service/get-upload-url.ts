import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getSession } from "next-auth/react";

interface Params {
  post_id: number;
  ext: string;
  mime: string;
  size: number;
}
export default async function getUploadUrl({
  post_id,
  ext,
  mime,
  size,
}: Params) {
  try {
    const session = await getSession();
    if (!session) {
      throw new Error("Unauthorized");
    }
    const supabase = await createSupabaseClient(session.supabaseAccessToken);
    const key = `draft/${session.user.id}/${post_id}.${ext}`;

    const { data: uploadUrl, error: uError } = await supabase.storage
      .from("media")
      .createSignedUploadUrl(key, { upsert: true });

    if (uError) {
      throw uError;
    }

    const { data: inserted, error: iError } = await supabase
      .from("post_media")
      .insert({
        post_id,
        path: key,
        ext,
        mime,
        size,
      })
      .select("id")
      .single();

    if (iError) {
      throw iError;
    }

    return {
      signed_url: uploadUrl.signedUrl,
      media_id: inserted.id,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
