'use client';
import { Button, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import Icon from '../Icon';
import Link from 'next/link';

export function BottomNavigation() {
	return (
		<footer className='absolute bottom-0 border-t-1 w-full pt-4 pb-4'>
			<ul className='flex justify-evenly'>
				<li>
					<Link href='/home'>
						<Icon icon='Home' />
					</Link>
				</li>
				<li>
					<Link href='/home'>
						<Icon icon='Calendar' />
					</Link>
				</li>
				<li>
					<Link href='/home'>
						<Icon icon='File' />
					</Link>
				</li>
				<li>
					<Link href='/home'>
						<Icon icon='Shop' />
					</Link>
				</li>
			</ul>
		</footer>
	);
}

export default BottomNavigation;
