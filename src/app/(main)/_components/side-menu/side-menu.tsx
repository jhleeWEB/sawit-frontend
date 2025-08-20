'use client';
import { Accordion, AccordionItem, Avatar, Divider, Link } from '@heroui/react';
import { PiHouseSimpleThin } from 'react-icons/pi';

export default function SideMenu() {
	return (
		<div className='flex flex-col justify-center p-8'>
			<div className='mb-4'>
				<Link className='text-default-900 gap-4'>
					<PiHouseSimpleThin size={22} />
					<h3>홈으로</h3>
				</Link>
			</div>
			<Divider />
			<Accordion>
				<AccordionItem key='1' aria-label='Accordion 1' title='최근 방문'>
					<div className='flex flex-col'>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a04258a2462d826712d'
							/>
							r/Supabase
						</Link>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
							/>
							r/Supabase
						</Link>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a04258114e29026302d'
							/>
							r/Supabase
						</Link>
					</div>
				</AccordionItem>
				<AccordionItem key='2' aria-label='Accordion 2' title='나만의 피드'>
					<div className='flex flex-col'>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a04258a2462d826712d'
							/>
							r/Supabase
						</Link>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
							/>
							r/Supabase
						</Link>
						<Link>
							<Avatar
								size='sm'
								src='https://i.pravatar.cc/150?u=a04258114e29026302d'
							/>
							r/Supabase
						</Link>
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
