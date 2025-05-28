'use client';
import { Button, Link, Navbar, NavbarContent, NavbarItem } from '@heroui/react';
import Icon from '../Icon';

export function TopNavigation() {
	return (
		<Navbar position='static'>
			<NavbarContent>hello</NavbarContent>
			<NavbarContent>
				<NavbarItem>
					<Button as={Link}>
						<Icon icon='Calendar' />
					</Button>
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}

export default TopNavigation;
