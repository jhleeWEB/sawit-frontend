import axios from "axios";
import getUserSession from "@/lib/auth/supabase/get-user-session";

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
  baseURL: backendApiUrl,
  withCredentials: true,
  allowAbsoluteUrls: true,
});

http.interceptors.request.use(async (config) => {
  const isServer = typeof window === undefined;
  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieHeader = await cookies();
    if (cookieHeader) config.headers.Cookie = cookieHeader;
  } else {
    const session = await getUserSession();
    if (session) config.headers.Authorization = `bearer ${session.user.id}`;
  }

  return config;
});

export default http;
