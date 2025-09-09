import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import { DraftPreviewFile } from "./upload-draft-files";

interface Params {
  title: string;
  text?: string;
  draftFiles: DraftPreviewFile[] | [];
  communityId: number;
}

export default async function savePostDraft(
  { title, text, draftFiles, communityId }: Params,
  postId?: string
) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = await createSupabaseClient(session.supabaseAccessToken);

  let result;

  if (postId) {
    //insert post
    result = await supabase
      .from("posts")
      .update({
        title,
        text,
        community_id: communityId,
        likes: 0,
        dislikes: 0,
        status: "draft",
      })
      .select()
      .single();
  } else {
    //insert post
    result = await supabase
      .from("posts")
      .insert({
        title,
        text,
        community_id: communityId,
        likes: 0,
        dislikes: 0,
        status: "draft",
      })
      .select()
      .single();
  }
  const { data: post, error: postError } = result;

  if (postError) {
    console.error(postError);
    return null;
  }

  //upload files to bucket
  const bucketName = "media";
  const fileUploadRes = await uploadMultipleFiles(
    supabase,
    draftFiles,
    bucketName,
    communityId,
    post.id
  );

  //convert to url
  const fileUrls = fileUploadRes.map((res) => {
    if (res.data) {
      return supabase.storage.from(bucketName).getPublicUrl(res.data?.path).data
        .publicUrl;
    } else {
      return "";
    }
  });
  //update post urls
  const { error: finalPostUpdateError } = await supabase
    .from("posts")
    .update({ media: fileUrls })
    .eq("id", post.id);
  if (finalPostUpdateError) {
    return null;
  }
  return post;
}

const uploadMultipleFiles = async (
  database: SupabaseClient,
  files: DraftPreviewFile[],
  bucketName: string,
  communityId: number,
  postId: number
) => {
  const promises = files.map((file) => {
    const { name } = file;
    const from = file.path;
    const to = `public/${communityId}/${postId}/${uuidv4()}-${name}`;
    return database.storage.from(bucketName).copy(from, to);
  });

  const res = await Promise.all(promises);
  return res;
};
