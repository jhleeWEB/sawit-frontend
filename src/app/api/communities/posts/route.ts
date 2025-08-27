import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createSupabaseClient();
    const formData = await req.formData();

    const communityId = formData.get("community_id") as string;
    const files = formData.getAll("files") as unknown;
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;

    const bucketName = `community_${communityId}_posts`;
    const bucketExist = await getBucketExist(supabase, bucketName);

    if (!bucketExist) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ["image/*"],
      });
    }
    const fileUploadRes = await uploadMultipleFiles(
      supabase,
      files as File[],
      bucketName
    );

    const fileUris = fileUploadRes.map((res) => {
      if (res.data) {
        return supabase.storage.from(bucketName).getPublicUrl(res.data?.path)
          .data.publicUrl;
      } else {
        return "";
      }
    });

    const postPost = await supabase
      .from("posts")
      .insert({
        title,
        text,
        file_uris: fileUris,
        community_id: communityId,
      })
      .select();

    if (postPost.error) {
      throw postPost.error;
    }

    return new Response(JSON.stringify({ id: postPost.data[0].id }), {
      status: postPost.status,
    });
  } catch (e: unknown) {
    console.error(e);
    return new Response(e.message, { status: e.status });
  }

  return new Response("testing");
}

const uploadMultipleFiles = async (
  database: SupabaseClient,
  files: File[],
  bucketName: string
) => {
  const promises = files.map((file) => {
    const { type } = file;
    return database.storage.from(bucketName).upload(randomUUID(), file, {
      contentType: type,
      upsert: true,
    });
  });

  const res = await Promise.all(promises);
  return res;
};

const getBucketExist = async (database: SupabaseClient, bucketName: string) => {
  const { data, error } = await database.storage.listBuckets();
  if (error) {
    console.error(error);
    return false;
  }
  return data.some((bucket) => bucket.name === bucketName);
};
