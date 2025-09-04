import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    supabaseAccessToken: string;
    user: User;
  }
}
