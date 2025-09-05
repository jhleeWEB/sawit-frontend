import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

interface Params {
  title: string;
  text?: string;
  files: File[] | [];
  communityId: number;
}

export default async function createNewPost({
  title,
  text,
  files,
  communityId,
}: Params) {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const supabase = await createSupabaseClient(session.supabaseAccessToken);

  //insert post
  const { data: post, error: postError } = await supabase
    .from("posts")
    .insert({
      title,
      text,
      community_id: communityId,
      likes: 0,
      dislikes: 0,
    })
    .select()
    .single();

  if (postError) {
    console.error(postError);
    return null;
  }

  //upload files to bucket
  const bucketName = "media";
  const fileUploadRes = await uploadMultipleFiles(
    supabase,
    files as File[],
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
  files: File[],
  bucketName: string,
  communityId: number,
  postId: number
) => {
  const promises = files.map((file) => {
    const { type } = file;
    const path = `public/community_${communityId}/post_${postId}/${uuidv4()}-${
      file.name
    }`;
    return database.storage.from(bucketName).upload(path, file, {
      contentType: type,
      upsert: true,
    });
  });

  const res = await Promise.all(promises);
  return res;
};
