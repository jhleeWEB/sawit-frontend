import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	const userId = params.id;
	const supabase = await createClient();
	console.log(userId);
	if (userId) {
		const novels = supabase.from('public').select('*').eq('author_id', userId);
		return new Response(JSON.stringify(novels), { status: 200 });
	}

	return new NextResponse();
}
