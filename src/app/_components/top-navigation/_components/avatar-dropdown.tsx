'use client';

import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@heroui/react';

interface Props {
	image: string;
	name: string;
}
export default function AvatarDropdown({ image, name }: Props) {
	return (
		<Dropdown
			placement='bottom-end'
			shadow='none'
			radius='sm'
			classNames={{
				content: 'border bg-transparent backdrop-blur-lg',
			}}
		>
			<DropdownTrigger>
				<Avatar isBordered showFallback src={image} color='success' size='sm' />
			</DropdownTrigger>
			<DropdownMenu variant='light'>
				<DropdownItem key='name'>{name}</DropdownItem>
				<DropdownItem href={`/a/${name}`} key='go-to-profile'>
					프로필
				</DropdownItem>
				<DropdownItem key='signout'>로그아웃</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
}
