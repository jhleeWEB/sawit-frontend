'use client';

import {
	Button,
	Form,
	Input,
	Select,
	SelectItem,
	Textarea,
} from '@heroui/react';

export default function NovelForm() {
	return (
		<div>
			<Form>
				<Input label='제목' required />
				<Select label='장르' selectionMode='multiple'>
					<SelectItem key={1}>장르</SelectItem>
					<SelectItem key={2}>장르</SelectItem>
					<SelectItem key={3}>장르</SelectItem>
					<SelectItem key={4}>장르</SelectItem>
					<SelectItem key={5}>장르</SelectItem>
					<SelectItem key={6}>장르</SelectItem>
					<SelectItem key={7}>장르</SelectItem>
				</Select>
				<Textarea label='작품 설명' />
				<Button>다음</Button>
			</Form>
		</div>
	);
}
