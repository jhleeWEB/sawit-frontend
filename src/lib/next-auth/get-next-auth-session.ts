import { getServerSession } from "next-auth";
import { authOptions } from "../auth/supabase/auth-options";
import { getSession } from "next-auth/react";

export default async function getNextAuthSession() {
  if (typeof window === "undefined") {
    return await getServerSession(authOptions);
  } else {
    return await getSession();
  }
}
