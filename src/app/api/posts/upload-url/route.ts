import { authOptions } from "@/lib/auth/supabase/auth-options";
import { getSupabaseClient } from "@/lib/auth/supabase/getSupabaseClient";
import http from "@/lib/axios/http";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const { community_id, ext, mime, size } = await req.json();
    const postId = await http.post("/posts/ensure", { community_id });
    const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
    const key = `draft/${session.user.id}/${postId}.${ext}`;

    const { data: uploadUrl, error: uError } = await supabase.storage
      .from("media")
      .createSignedUploadUrl(key);

    if (uError) {
      console.error(uError);
      throw uError;
    }

    const { data: inserted, error: iError } = await supabase
      .from("post_media")
      .insert({
        post_id: postId,
        path: key,
        ext,
        mime,
        size,
      })
      .select("id")
      .single();

    if (iError) {
      console.error(iError);
      throw iError;
    }

    return NextResponse.json({
      signed_url: uploadUrl.signedUrl,
      media_id: inserted.id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
