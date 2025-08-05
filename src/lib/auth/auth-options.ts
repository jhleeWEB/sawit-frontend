import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import InstagramProvider from 'next-auth/providers/instagram';

export const authOptions = {
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
};
