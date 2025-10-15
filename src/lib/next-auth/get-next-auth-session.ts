import { getServerSession } from "next-auth";
import { authOptions } from "../auth/supabase/auth-options";
import getUserSession from "@/lib/auth/supabase/get-user-session";

export default async function getNextAuthSession() {
  if (typeof window === "undefined") {
    return await getServerSession(authOptions);
  } else {
    return await getUserSession();
  }
}
