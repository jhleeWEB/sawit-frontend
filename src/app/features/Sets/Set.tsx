import { Input, TableCell, TableRow, useDisclosure } from '@heroui/react';
import { useState } from 'react';
import WeightInputModal from './WeightInputModal';

interface Props {
	index: number | string;
	weight?: number;
	reps?: number;
}

export default function Set({ index, weight = 0, reps = 10 }: Props) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<TableRow>
				<TableCell>
					<p>{index}</p>
				</TableCell>
				<TableCell>
					<Input
						variant='bordered'
						type='number'
						value={weight.toString()}
						endContent={<span>Kg</span>}
						onClick={onOpen}
					/>
					<WeightInputModal isOpen={isOpen} onOpenChange={onOpenChange} />
				</TableCell>
				<TableCell>
					<Input variant='bordered' type='number' value={reps.toString()} />
				</TableCell>
				<TableCell>
					<Input variant='bordered' type='checkbox' />
				</TableCell>
			</TableRow>
		</>
	);
}
