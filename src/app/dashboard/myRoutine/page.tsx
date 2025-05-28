import Title from '@/components/Title';
import RoutineCard from './RoutineCard';

export default function MyRoutine() {
	return (
		<section>
			<Title>내 루틴</Title>
			<ul>
				<li>
					<RoutineCard></RoutineCard>
				</li>
				<li>
					<RoutineCard></RoutineCard>
				</li>
				<li>
					<RoutineCard></RoutineCard>
				</li>
				<li>
					<RoutineCard></RoutineCard>
				</li>
			</ul>
		</section>
	);
}
