import CardContainer from '@/components/CardContainer';
import { NovelSample } from '@/hooks/useNovelSamples';
import Pages from './_components/Pages';
import PageController from './_components/PageController';

export default async function Volumn({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const novelData = fetchNovelInfo(id);
	const novelPageData = fetchNovelPages();
	const [novel, novelPages] = await Promise.all([novelData, novelPageData]);

	return (
		<CardContainer title={novel?.title}>
			<Pages pages={novelPages.pages} />
			<PageController />
		</CardContainer>
	);
}

async function fetchNovelInfo(novelId: string) {
	const data = await import('/public/samples/korean_sample_novels_100.json');
	return (Array.from(data) as NovelSample[]).find((n) => n.id == novelId);
}

async function fetchNovelPages() {
	const data = await import('/public/samples/volumn_content.json');
	return {
		pages: Array.from(data.content) as string[],
	};
}
