'use client';
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import Title from '@/components/Title';
import { Form, Input, Tab, Tabs } from '@heroui/react';

const tabOptions = ['text', 'image & video', 'link'];

export default function CreatePost() {
	return (
		<section className='h-full overflow-y-auto'>
			<Title>Create Post</Title>
			<Tabs aria-label='Tabs'>
				{tabOptions.map((option) => (
					<Tab key={option} title={option.toUpperCase()} />
				))}
			</Tabs>
			<Form>
				<Input placeholder='Title' required />
				<div className='p-5 bg-slate-100'>
					<SimpleEditor />
				</div>
			</Form>
		</section>
	);
}
