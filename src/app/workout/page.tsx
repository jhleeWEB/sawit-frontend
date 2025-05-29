'use client';
import Title from '@/components/Title';
import { Accordion, AccordionItem } from '@heroui/react';
import Sets from '../features/Sets';

const accordionOptions = ['memo', 'sets'];

export default function Workout() {
	return (
		<div>
			<div>workout name</div>
			<div>total reps</div>
			<Title>[Exercise Name]</Title>
			<Accordion variant='light'>
				{accordionOptions.map((option, i) => (
					<AccordionItem key={i} title={option.toUpperCase()}>
						{option.toLocaleUpperCase()}
					</AccordionItem>
				))}
			</Accordion>
			<Sets />
		</div>
	);
}
