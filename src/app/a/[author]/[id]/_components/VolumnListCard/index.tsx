import CardContainer from '@/components/CardContainer';
import { VolumnTitleSample } from '../../page';
import Link from 'next/link';

interface Props {
	novelId: string;
	volumns?: VolumnTitleSample[];
}
export default async function VolumnListCard({ volumns, novelId }: Props) {
	if (!volumns) {
		return;
	}

	return (
		<CardContainer title='작품 회차'>
			<ul>
				{volumns.map((volumn) => (
					<Link
						key={volumn.id + volumn.title}
						href={`${novelId}/volumn/?No=${volumn.no}/page=${0}`}
					>
						<li className='cursor-pointer hover:bg-slate-100 border-b-1 py-2'>
							{volumn.title}
							<div className='flex gap-2'>
								<span>
									<small>별점:</small>
									<small>{volumn.rating}</small>
								</span>
								<span>
									<small>조회:</small>
									<small>{volumn.views.toLocaleString()}</small>
								</span>
								<span>
									<small>업데이트:</small>
									<small>{new Date(volumn.updated_at).toDateString()}</small>
								</span>
							</div>
						</li>
					</Link>
				))}
			</ul>
		</CardContainer>
	);
}
