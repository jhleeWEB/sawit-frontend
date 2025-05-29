import {
	Button,
	Input,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';
import Set from './Set';
import { useState } from 'react';

export default function Sets() {
	const [rows, setRows] = useState([{ weight: 0, reps: 10 }]);
	return (
		<section>
			<Table>
				<TableHeader>
					<TableColumn>set</TableColumn>
					<TableColumn>weight</TableColumn>
					<TableColumn>reps</TableColumn>
					<TableColumn>status</TableColumn>
				</TableHeader>
				<TableBody>
					{rows.map((row, i) => {
						return Set({ index: i, weight: row.weight, reps: row.reps });
					})}
				</TableBody>
			</Table>
			<div>
				<Button>+ add</Button>
				<Button>- remove</Button>
			</div>
		</section>
	);
}
