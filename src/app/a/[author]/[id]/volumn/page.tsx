import CardContainer from '@/components/CardContainer';
import { NovelSample } from '@/hooks/useNovelSamples';

export default async function Volumn({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const novelData = fetchNovelInfo(id);
	const [novel] = await Promise.all([novelData]);

	return <CardContainer title={novel?.title}></CardContainer>;
}

async function fetchNovelInfo(novelId: string) {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).find((n) => n.id == novelId);
}
