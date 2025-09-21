import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { PostTabOption } from "../_components/post-form";

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
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = await createSupabaseClient(session.supabaseAccessToken);
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
    const ext = f.name.split(".").pop();
    const key = `public/${postId}/${uuidv4()}.${ext}`;
    //Storage에 업로드
    const { data: upload, error: uError } = await database.storage
      .from("media")
      .upload(key, f, { upsert: true });
    if (uError) {
      console.error(uError);
      continue;
    }
    const publicUrl = database.storage.from("media").getPublicUrl(upload.path)
      .data.publicUrl;
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
