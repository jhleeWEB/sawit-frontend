import { Metadata } from 'next';

import '../globals.css';
import Providers from '../providers';
import Footer from './_components/footer';
import TopNavigation from './_components/top-navigation/top-navigation';
import { createClient } from '@/utils/supabase/server';
import { UserProvider } from '@/components/auth/user-provider';

export const metadata: Metadata = {
	title: 'Sawit',
	description: 'Have You seen it? Yes I Sawit!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<html lang='en'>
			<body>
				<UserProvider initialUser={user}>
					<Providers>
						<TopNavigation />
						<main className='mx-auto max-w-screen-md'>
							<div className='w-full flex justify-center'>{children}</div>
						</main>
						<Footer />
					</Providers>
				</UserProvider>
			</body>
		</html>
	);
}
