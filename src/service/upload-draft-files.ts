import { getSupabaseClientWithToken } from "@/lib/auth/supabase/get-supabase-client";
import { sanitizeObjectKey } from "@/utils/senitize-object-key";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export interface DraftPreviewFile {
  path: string;
  type: string;
  size: number;
  signedUrl: string; // 미리보기용
  name: string;
}

export default async function uploadDraftFiles(
  file: File
): Promise<DraftPreviewFile | null> {
  const session = await getUserSession();
  if (!session) {
    return null;
  }
  const supabase = getSupabaseClientWithToken(session.supabaseAccessToken);
  const key = `draft/${session.user.id}/temp/${sanitizeObjectKey(file.name)}`;
  const { data, error } = await supabase.storage
    .from("media")
    .upload(key, file, {
      cacheControl: "31536000",
      upsert: true,
      contentType: file.type || undefined,
    });
  if (error) throw error;

  const { data: signed, error: signedError } = await supabase.storage
    .from("media")
    .createSignedUrl(key, 60 * 10); //10 분

  if (signedError) {
    return null;
  }
  return {
    path: data.path,
    type: file.type,
    size: file.size,
    signedUrl: signed.signedUrl, // 미리보기용
    name: file.name,
  };
}
