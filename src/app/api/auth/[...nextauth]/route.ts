import NextAuth from "next-auth";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import InstagramProvider from "next-auth/providers/instagram";
import { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID as string,
      clientSecret: process.env.AUTH_NAVER_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID as string,
      clientSecret: process.env.AUTH_KAKAO_SECRET as string,
    }),
    InstagramProvider({
      clientId: process.env.AUTH_INSTAGRAM_ID as string,
      clientSecret: process.env.AUTH_INSTAGRAM_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      const signingSecret = process.env.SUPABASE_JWT_SECRET!;
      const payload = {
        aud: "authenticated",
        exp: Math.floor(new Date(session.expires).getTime() / 1000),
        sub: user.id,
        email: user.email,
        role: "authenticated",
      };
      session.user = { ...user };
      session.supabaseAccessToken = jwt.sign(payload, signingSecret);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
