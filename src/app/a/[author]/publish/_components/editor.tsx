'use client';
import { Input } from '@heroui/react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
export default function EditorWrapper() {
	return (
		<section className='w-full h-dvh'>
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
		</section>
	);
}
