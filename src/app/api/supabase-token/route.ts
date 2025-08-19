// app/api/supabase-token/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { SignJWT } from 'jose';
import { authOptions } from '@/lib/auth/auth-options';

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email || !session.user.id) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = session.user.id as string;
	const email = session.user.email;

	const secret = new TextEncoder().encode(process.env.SUPABASE_JWT_SECRET!);
	const jwt = await new SignJWT({
		sub: userId,
		email,
		role: 'authenticated', // ✅ RLS에 필요한 DB 롤
		aud: 'authenticated',
		iss: 'next-auth',
	})
		.setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
		.setIssuedAt()
		.setExpirationTime('1h')
		.sign(secret);

	return NextResponse.json({ token: jwt }, { status: 200 });
}
