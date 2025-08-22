import { Metadata } from 'next';

import '../globals.css';
import Providers from '../providers';
import TopNavigation from './_components/top-navigation/top-navigation';
import SideMenu from './_components/side-menu/side-menu';

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
					<main className='h-full w-full grid grid-cols-4'>
						<aside className='col-start-1 col-span-1 border-r-1'>
							<SideMenu />
						</aside>
						<section className='col-span-3 h-full w-full max-h-[calc(100dvh-128px)] overflow-hidden'>
							<div className='w-full h-full grid grid-cols-3 overflow-y-auto scrollbar-hide'>
								{children}
							</div>
						</section>
					</main>
				</Providers>
			</body>
		</html>
	);
}
