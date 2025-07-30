'use client';
import {
	Input,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from '@heroui/react';

export function Navigation() {
	return (
		<Navbar>
			<NavbarBrand>
				<p>SAWIT</p>
			</NavbarBrand>
			<NavbarContent justify='center'>
				<Input type='search' placeholder='Type to search' radius='lg' />
			</NavbarContent>
			<NavbarContent justify='end'>
				<NavbarItem>adds</NavbarItem>
				<NavbarItem>post</NavbarItem>
				<NavbarItem>notice</NavbarItem>
				<NavbarItem>user</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
}

export default Navigation;
