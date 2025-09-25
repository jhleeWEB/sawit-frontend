import { authOptions } from "@/lib/auth/supabase/auth-options";
import { getSupabaseClientWithToken } from "@/lib/auth/supabase/getSupabaseClient";
import { SupabaseClient } from "@supabase/supabase-js";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*post id를 반환하는 요청입니다. */
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new Error("Unauthorized");
    }
    const { community_id, uid } = await req.json();
    const supabase = getSupabaseClientWithToken(
      session.supabaseAccessToken
    ) as SupabaseClient;
    const { data: exist } = await supabase
      .from("posts")
      .select("id")
      .eq("owner_id", uid)
      .single();

    /**기존 작성중인 드레프트 포스트가 없을 경우 */
    if (!exist) {
      //shell 레코드 생성하고 id 반환하기
      const { data: post_id, error } = await supabase
        .from("posts")
        .insert({
          title: "",
          text: "",
          community_id,
          status: "draft",
        })
        .select("id")
        .single();
      if (error) {
        throw error;
      }
      return NextResponse.json({ post_id, message: "새로 생성" });
    }
    return NextResponse.json({ post_id: exist.id, message: "이미 존재" });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
