import { Metadata } from 'next';

import '../globals.css';
import Providers from '../providers';
import Footer from './_components/footer';
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
			<body>
				<Providers>
					<TopNavigation />
					<main className='mx-auto max-w-screen-md'>
						<div className='w-full flex justify-center'>{children}</div>
					</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
