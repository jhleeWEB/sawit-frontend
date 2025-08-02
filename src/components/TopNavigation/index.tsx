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

export default async function Navigation() {
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
					<Image
						alt='user profile avatar'
						className='object-cover rounded-full cursor-pointer border-1 border-transparent hover:border-teal-400'
						src='https://heroui.com/images/hero-card-complete.jpeg'
						height={32}
						width={32}
					/>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}
