import http from '@/http';

export interface Post {
	_id: string;
	title: string;
	content: string;
	author: string;
	publication_date?: Date;
	tags: string;
	likes: number;
	dislikes: number;
	comments: string[];
	thread: string;
}

export async function fetchThreadPosts(name: string) {
	const res = await http.get<Post[]>(`/thread/${name}/posts`);
	return res.data;
}
