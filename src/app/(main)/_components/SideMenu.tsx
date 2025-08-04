'use client';
import { Listbox, ListboxItem } from '@heroui/react';
import { useRouter } from 'next/navigation';

const menus = ['home', 'popular', 'explore', 'all'];

export default function SideMenu() {
	const router = useRouter();
	return (
		<aside className='relative col-start-1 row-start-1'>
			<div className='sticky h-full max-h-[calc(100dvh-64px)] overflow-y-auto'>
				<Listbox
					aria-label='menu'
					className='p-0 gap-0 mb-4 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium'
					itemClasses={{
						base: 'px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80',
					}}
				>
					{menus.map((menu) => (
						<ListboxItem key={menu} onClick={() => router.push('/')}>
							{menu.toUpperCase()}
						</ListboxItem>
					))}
				</Listbox>
			</div>
		</aside>
	);
}
