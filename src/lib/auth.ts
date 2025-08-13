import { createClient } from '@/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

export async function login(provider: Provider) {
	const supabase = await createClient();
	await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo: 'http://localhost:3000/callback' },
	});
	return false;
}

export async function logout() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error.message);
	} else {
		redirect('/');
	}
	return false;
}
