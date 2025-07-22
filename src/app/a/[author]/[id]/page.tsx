import { NovelSample } from '@/hooks/useNovelSamples';
import NovelInfoCard from './_components/NovelInfoCard';
import VolumnListCard from './_components/VolumnListCard';

export default async function Book({
	params,
}: {
	params: Promise<{ author: string; id: string }>;
}) {
	const { id } = await params;

	const volumnTitleData = fetchVolumnTitles(id);
	const novelData = fetchNovelInfo(id);

	const [volumnTitles, novel] = await Promise.all([volumnTitleData, novelData]);

	return (
		<section className='gap-4 p-4'>
			<NovelInfoCard novel={novel} />
			<VolumnListCard novelId={id} volumns={volumnTitles} />
		</section>
	);
}

export type VolumnTitleSample = {
	novel_id: string;
	id: number;
	no: number;
	title: string;
	blob: number;
	created_at: Date;
	updated_at: Date;
	views: number;
	rating: number;
};

async function fetchVolumnTitles(novelId: string) {
	const data = await import('/public/samples/volumn_titles_info.json');
	return (Array.from(data) as VolumnTitleSample[]).filter(
		(n) => n.novel_id == novelId
	);
}
async function fetchNovelInfo(novelId: string) {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).find((n) => n.id == novelId);
}
