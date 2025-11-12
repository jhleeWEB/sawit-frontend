import { PreviewCarouselValue } from "@/app/(main)/c/[community_id]/[post_id]/edit/_components/preview-carousel";
import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";
import { v4 as uuidv4 } from "uuid";

interface Params {
  title: string;
  text: string;
  post_id: number;
  isPrivate: boolean;
  isSpoiler: boolean;
  isNSFW: boolean;
  media: PreviewCarouselValue[];
}

export default async function updatePost({
  post_id,
  title,
  text,
  isPrivate,
  isSpoiler,
  isNSFW,
  media,
}: Params) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);

  const removed = media.filter((n) => n.status === "removed");
  if (removed.length > 0) {
    const { error: sError } = await supabase.storage
      .from("media")
      .remove(removed.map((n) => n.path!));

    if (sError) {
      console.error(sError);
      return null;
    }
  }

  const newMedia = [];

  for (const value of media) {
    if (value.status === "draft" && value.file) {
      const ext = value.file?.name.split(".").pop();
      const key = `public/${post_id}/${uuidv4()}.${ext}`;
      const { data: uData, error: uError } = await supabase.storage
        .from("media")
        .upload(key, value.file, { upsert: true });
      if (uError) {
        console.error(uError);
        continue;
      }
      const publicUrl = await supabase.storage
        .from("media")
        .getPublicUrl(uData.path).data.publicUrl;
      //post media에 insert
      const { data: pData, error: pError } = await supabase
        .from("post_media")
        .insert({
          post_id: post_id,
          name: value.file?.name,
          mime: value.file?.type,
          ext: ext,
          path: uData.path,
          url: publicUrl,
        })
        .select("id, url")
        .single();
      if (pError) {
        console.error(pError);
        continue;
      }
      newMedia.push(pData.url);
    }
    if (value.status === "removed") {
      supabase
        .from("post_media")
        .delete()
        .eq("url", value.url)
        .eq("path", value.path);
    }
    if (value.status === "published") {
      newMedia.push(value.url);
    }
  }

  //update post media_url
  const { data: nPost, error: nError } = await supabase
    .from("posts")
    .update({
      title,
      text,
      media_urls: newMedia,
      is_private: isPrivate,
      is_spoiler: isSpoiler,
      is_nsfw: isNSFW,
    })
    .eq("id", post_id)
    .select("id, community_id")
    .single();

  if (nError) {
    console.error(nError);
  }
  return nPost;
}
