import { Button, Checkbox, Input, Link } from '@heroui/react';

export default function name() {
	return (
		<main className='h-dvh mx-auto max-w-screen-md'>
			<div className='h-full flex justify-center items-center'>
				<div className='flex flex-col w-[60%] rounded-lg p-16 border-1 gap-2'>
					<Input variant='underlined' label='이메일' type='email' />
					<Input variant='underlined' label='암호' type='password' />

					<Checkbox className='mb-4' radius='sm'>
						<small className='text-gray-400'>기억하기</small>
					</Checkbox>

					<Button className='rounded-md mb-2 bg-teal-400 text-white font-bold'>
						로그인
					</Button>
					<Link>
						<small className='w-full text-center text-sm text-gray-300'>
							취소
						</small>
					</Link>
				</div>
			</div>
		</main>
	);
}
