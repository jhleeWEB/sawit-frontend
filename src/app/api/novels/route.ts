import { createSupabaseClient } from '@/lib/auth/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const id = req.nextUrl.searchParams.get('id');
		const supabase = createSupabaseClient();
		const { data, error } = await supabase
			.from('novels')
			.select('*')
			.eq('author_id', id);

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
