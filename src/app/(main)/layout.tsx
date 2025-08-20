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
					<main className='h-full w-full grid grid-cols-4 bg-slate-50'>
						<aside className='col-start-1 col-span-1 bg-slate-100'>
							side menu
						</aside>
						<section className='col-span-3 h-full w-full max-h-[calc(100dvh-128px)] overflow-hidden'>
							<div className='w-full h-full grid grid-cols-3 overflow-y-auto scrollbar-hide'>
								<div className='col-span-3'>
									<div className='bg-red-200 min-h-[128px] w-full'>header</div>
								</div>
								{children}
								<div className='col-start-3 col-span-1 bg-teal-100 flex flex-col'>
									<div className='sticky top-0 bg-red-300 min-h-[450px]'>
										info
									</div>
								</div>
							</div>
						</section>
					</main>
				</Providers>
			</body>
		</html>
	);
}
