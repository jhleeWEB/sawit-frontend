'use client';

import { Button } from '@heroui/react';
import { SiKakao, SiNaver } from 'react-icons/si';
import {
	AiOutlineInstagram,
	AiOutlineGoogle,
	AiOutlineGithub,
} from 'react-icons/ai';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const authTypes = ['naver', 'kakao', 'instagram', 'google', 'github'];

export default function LoginPage() {
	return (
		<section className='h-full w-full flex justify-center items-center'>
			<div className='flex flex-col w-[60%] rounded-lg pt-16 px-16 pb-8 border-1 gap-2'>
				{authTypes.map((type) => (
					<Button
						key={type}
						variant='bordered'
						fullWidth
						className='relative flex items-center border-1 border-teal justify-center rounded-md mb-2 text-gray-400 font-bold'
						onPress={() => signIn(type, { callbackUrl: '/' })}
					>
						{type === 'naver' && (
							<SiNaver className='absolute left-4' size={12} />
						)}
						{type === 'kakao' && (
							<SiKakao className='absolute left-4' size={32} />
						)}
						{type === 'instagram' && (
							<AiOutlineInstagram className='absolute left-4' size={18} />
						)}
						{type === 'google' && (
							<AiOutlineGoogle className='absolute left-4' size={18} />
						)}
						{type === 'github' && (
							<AiOutlineGithub className='absolute left-4' size={18} />
						)}
						{type}로 계속하기
					</Button>
				))}
				<Link
					href={'/'}
					className='w-full text-center text-gray-300 mt-5 cursor-pointer hover:text-danger-300'
				>
					<small>뒤로가기</small>
				</Link>
			</div>
		</section>
	);
}
