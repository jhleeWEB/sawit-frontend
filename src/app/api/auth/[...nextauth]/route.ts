import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const options = {
	providers: [
		GithubProvider({
			clientId: process.env.AUTH_GITHUB_ID as string,
			clientSecret: process.env.AUTH_GITHUB_SECRET as string,
		}),
	],
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
