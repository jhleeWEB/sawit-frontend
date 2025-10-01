import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function updateUsername(newUsername: string) {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const id = session.user.id;
  const cleaned = newUsername
    .trim() // 앞뒤 공백 제거
    .replace(/\s+/g, " ") // 중복 공백 1칸으로 축소
    .replace(/<script.*?>.*?<\/script>/gi, "") // script 태그 제거
    .replace(/<\/?[^>]+(>|$)/g, "") // 모든 HTML 태그 제거
    .replace(
      /(--|;|\/\*|\*\/|@@|@|char|nchar|varchar|alter|begin|cast|create|cursor|declare|delete|drop|end|exec|execute|fetch|insert|kill|open|select|sys|sysobjects|syscolumns|table|update)/gi,
      ""
    ); // SQL 키워드 제거
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const { error } = await supabase
    .from("users")
    .update({ username: cleaned })
    .eq("id", id)
    .select("id")
    .single();
  if (error) {
    console.error(error);
    if (error.code === "23505") {
      return "duplicate";
    }
    return "error";
  }
  return "success";
}
