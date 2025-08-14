import { authOptions } from '@/lib/auth/auth-options';
import { createSupabaseClient } from '@/lib/auth/supabase/server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

		if (!session || !session?.accessToken) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}
		const supabase = createSupabaseClient(session.accessToken);

		const { data, error } = await supabase
			.from('novels')
			.select('*')
			.eq('author_id', session.user.id)
			.order('created_at', { ascending: false });

		if (error) {
			console.error('Supabase Error: ', error);
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({ novels: data });
	} catch (e) {
		console.error(e);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 500 }
		);
	}
}
