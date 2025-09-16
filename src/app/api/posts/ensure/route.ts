import { authOptions } from "@/lib/auth/supabase/auth-options";
import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

/*post id를 반환하는 요청입니다. */
export async function POST(req: Request) {
  const { community_id } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "session error: 사용자 세션이 없습니다." },
      { status: 500 }
    );
  }
  const uid = session.user.id;

  const supabase = await createSupabaseClient();
  const { data: exist } = await supabase
    .from("posts")
    .select("id")
    .eq("owner_id", uid)
    .single();

  /**기존 작성중인 드레프트 포스트가 없을 경우 */
  if (!exist) {
    //shell 레코드 생성하고 id 반환하기
    const { data: post_id, error } = await supabase.from("posts").insert({
      title: "",
      text: "",
      community_id,
      status: "draft",
    });
    if (error) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: 500 }
      );
    }
    return NextResponse.json({ post_id });
  }
  return NextResponse.json({ post_id: exist.id });
}
