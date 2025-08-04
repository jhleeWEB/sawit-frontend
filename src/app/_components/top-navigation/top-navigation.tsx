import {
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

import { IoAddOutline } from 'react-icons/io5';
import AvatarDropdown from './_components/avatar-dropdown';

export default async function TopNavigation() {
	const session = await getServerSession();

	return (
		<Navbar isBlurred>
			<NavbarBrand>
				<p>SAWIT</p>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<Input type='search' placeholder='Type to search' radius='lg' />
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>
					<Link
						href={'/a/강은지/publish'}
						className='flex items-center p-2 pl-0 text-[24px] rounded-md cursor-pointer hover:text-teal-400'
					>
						<IoAddOutline />
						<small className='text-[12px]'>글쓰기</small>
					</Link>
				</NavbarItem>
				<NavbarItem>
					{session ? (
						<AvatarDropdown
							image={
								session.user?.image || 'https://images.unsplash.com/broken'
							}
							name={session.user?.name || '이름없음'}
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
