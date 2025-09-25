'use client';

import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<HeroUIProvider>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</HeroUIProvider>
		</SessionProvider>
	);
}
