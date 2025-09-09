import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { DraftPreviewFile } from "@/service/upload-draft-files";
import { sanitizeObjectKey } from "@/utils/senitize-object-key";
import { SupabaseClient } from "@supabase/supabase-js";

import { getSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

interface Params {
  title: string;
  text?: string;
  draftFiles: DraftPreviewFile[] | [];
  communityId: number;
}

export default async function createNewPost({
  title,
  text,
  draftFiles,
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
    })
    .select()
    .single();

  if (postError) {
    console.error(postError);
    return null;
  }

  //upload files to bucket
  const bucketName = "media";
  const publishUrls = await moveFilesFromDraftToPublic(
    supabase,
    draftFiles,
    bucketName,
    communityId,
    post.id
  );

  //update post urls
  const { error: finalPostUpdateError } = await supabase
    .from("posts")
    .update({ media: publishUrls })
    .eq("id", post.id);
  if (finalPostUpdateError) {
    return null;
  }
  return post;
}

const moveFilesFromDraftToPublic = async (
  database: SupabaseClient,
  files: DraftPreviewFile[],
  bucketName: string,
  communityId: number,
  postId: number
) => {
  const paths: string[] = [];
  const promises = files.map((file) => {
    const { path, name } = file;
    const from = path;
    const to = `public/${communityId}/${postId}/${uuidv4()}-${sanitizeObjectKey(
      name
    )}`;
    paths.push(to);
    return database.storage.from(bucketName).move(from, to);
  });
  await Promise.all(promises);
  return paths.map(
    (path) => database.storage.from("media").getPublicUrl(path).data.publicUrl
  );
};
