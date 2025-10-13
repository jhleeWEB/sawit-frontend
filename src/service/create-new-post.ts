import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import { SupabaseClient } from "@supabase/supabase-js";

import getUserSession from "@/lib/auth/supabase/get-user-session";
import { v4 as uuidv4 } from "uuid";
import { PostTabOption } from "../app/(main)/c/[community_id]/create/_components/post-form";

interface Params {
  title: string;
  text?: string;
  files: File[] | [];
  type: PostTabOption;
  communityId: number | undefined;
}

export default async function createNewPost({
  title,
  text,
  files,
  type,
  communityId,
}: Params) {
  const session = await getUserSession();
  if (!session) {
    console.error("no session");
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const status = type === "text" ? "published" : "draft";
  //insert post
  const { data: post, error: pError } = await supabase
    .from("posts")
    .insert({
      title,
      text,
      type,
      community_id: communityId,
      status,
    })
    .select()
    .single();

  if (pError) {
    console.error(pError);
    return null;
  }
  if (type === "text") {
    return post;
  }

  //upload files to bucket
  const postMediaIds = await uploadFiles(supabase, files, post.id);
  if (!postMediaIds) {
    console.error("uploading files error");
    return null;
  }
  //update post urls
  const { error: finalPostUpdateError } = await supabase
    .from("posts")
    .update({
      media_urls: postMediaIds.map((media) => media.url),
      status: "published",
    })
    .eq("id", post.id);

  if (finalPostUpdateError) {
    console.error(finalPostUpdateError);
    return null;
  }
  return post;
}

const uploadFiles = async (
  database: SupabaseClient,
  files: File[],
  postId: number
) => {
  const media = [];
  for (const f of files) {
    const isImage = f.type.startsWith("image/");
    const ext = f.name.split(".").pop();
    const key = `public/${postId}/${uuidv4()}.${ext}`;
    const storageName = isImage ? "images" : "videos";
    //Storage에 업로드
    const { data: upload, error: uError } = await database.storage
      .from(storageName)
      .upload(key, f, { upsert: true });
    if (uError) {
      console.error(uError);
      continue;
    }
    const publicUrl = database.storage
      .from(storageName)
      .getPublicUrl(upload.path).data.publicUrl;
    //post media에 insert
    const { data: pData, error: pError } = await database
      .from("post_media")
      .insert({
        post_id: postId,
        name: f.name,
        mime: f.type,
        ext: ext,
        path: upload.path,
        url: publicUrl,
      })
      .select("id, url")
      .single();
    if (pError) {
      console.error(pError);
      continue;
    }
    media.push(pData);
  }
  return media;
};
