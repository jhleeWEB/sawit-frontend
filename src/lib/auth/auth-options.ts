import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import InstagramProvider from 'next-auth/providers/instagram';
import { NextAuthOptions } from 'next-auth';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60 * 24,
	},
	adapter: SupabaseAdapter({
		url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
		secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			const signingSecret = process.env.SUBABASE_JWT_SECRET!;
			const payload = {
				aud: 'authenticated',
				exp: Math.floor(new Date(session.expires).getTime() / 1000),
				sub: token.id,
				email: token.email,
				role: 'authenticated',
			};
			session.user.id = token.id as string;
			session.accessToken = jwt.sign(payload, signingSecret);
			return session;
		},
	},
};
