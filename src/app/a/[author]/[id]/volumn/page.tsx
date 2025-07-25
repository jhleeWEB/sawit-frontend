import CardContainer from '@/components/CardContainer';
import { NovelSample } from '@/hooks/useNovelSamples';
import Pages from './_components/Pages';
import PageController from './_components/PageController';
import { VolumnTitleSample } from '../page';

export default async function Volumn({
	params,
	searchParams,
}: {
	params: Promise<{ id: string }>;
	searchParams: Promise<{ volumnNo: number }>;
}) {
	const { id } = await params;
	const { volumnNo } = await searchParams;
	const novelData = fetchVolumnTitles(id, volumnNo);
	const novelPageData = fetchNovelPages();
	const [novel, novelPages] = await Promise.all([novelData, novelPageData]);

	return (
		<CardContainer title={novel?.title}>
			<Pages pages={novelPages.pages} />
			<PageController />
		</CardContainer>
	);
}

async function fetchVolumnTitles(novelId: string, volumnNo = 0) {
	const data = await import('/public/samples/volumn_titles_info.json');
	return (Array.from(data) as VolumnTitleSample[])
		.filter((n) => n.novel_id == novelId)
		.find((n) => n.no == volumnNo);
}

async function fetchNovelPages() {
	const data = await import('/public/samples/volumn_content.json');
	return {
		pages: Array.from(data.content) as string[],
	};
}
