import {
	Image,
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';
import Link from 'next/link';

import { IoAddOutline } from 'react-icons/io5';
import AvatarDropdown from './_components/avatar-dropdown';
import { createClient } from '@/utils/supabase/server';

export default async function TopNavigation() {
	const supabase = await createClient();
	const session = await supabase.auth.getUser();

	return (
		<Navbar isBlurred>
			<NavbarBrand>
				<Link href='/'>
					<Image
						radius='none'
						alt='sawit-logo'
						src='/sawit-logo.png'
						height={36}
					/>
				</Link>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<Input type='search' placeholder='Type to search' radius='lg' />
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>
					<Link
						href={
							session.data.user?.user_metadata.name
								? `/a/${session.data.user?.user_metadata.name}/publish`
								: '/login'
						}
						className='flex items-center p-2 pl-0 text-[24px] rounded-md cursor-pointer hover:text-teal-400'
					>
						<IoAddOutline />
						<small className='text-[12px]'>글쓰기</small>
					</Link>
				</NavbarItem>
				<NavbarItem>
					{session.data.user ? (
						<AvatarDropdown
							image={
								session.data.user?.user_metadata.avatar_url ||
								'https://images.unsplash.com/broken'
							}
							name={session.data.user?.user_metadata.name || '이름없음'}
						/>
					) : (
						<Link href='/login'>
							<small className='cursor-pointer hover:text-primary-400'>
								로그인
							</small>
						</Link>
					)}
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
