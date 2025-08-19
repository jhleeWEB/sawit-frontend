import { Metadata } from 'next';

import '../globals.css';
import Providers from '../providers';
import TopNavigation from './_components/top-navigation/top-navigation';

export const metadata: Metadata = {
	title: 'Sawit',
	description: 'Have You seen it? Yes I Sawit!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='mx-auto max-h-vdh max-w-dvw'>
				<Providers>
					<TopNavigation />
					<main className='grid grid-cols-4 bg-slate-50'>
						<aside className='col-start-1 col-span-1 bg-slate-100'>
							side menu
						</aside>
						<section className='col-span-3 h-full max-h-[calc(100dvh-64px)] overflow-hidden'>
							{children}
						</section>
					</main>
				</Providers>
			</body>
		</html>
	);
}
