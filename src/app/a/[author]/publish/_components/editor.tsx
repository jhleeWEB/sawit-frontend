'use client';
import { Button, Input } from '@heroui/react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export default function EditorWrapper() {
	return (
		<section className='relative w-full h-dvh'>
			<div className='bg-slate-50 rounded-lg mt-16 p-4'>
				<Input
					label='제목'
					labelPlacement='outside-top'
					isRequired
					variant='underlined'
					className='mb-4'
					classNames={{
						input: 'text-[32px]',
					}}
				/>

				<Editor height='600px' initialEditType='wysiwyg' />
			</div>
			<div className='absolute gap-2 flex flex-col'>
				<Button variant='flat' color='default'>
					임시저장
				</Button>
				<Button variant='bordered'>미리보기</Button>
				<Button variant='flat' color='primary'>
					업로드
				</Button>
			</div>
		</section>
	);
}
