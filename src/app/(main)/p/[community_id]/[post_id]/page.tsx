import fetchPost from "@/service/fetch_post";
import fetchCommunity from "@/service/fetch-community";
import CommunityInfo from "@/features/community-info";
import PostCard from "@/features/post-card/post-card";

import type { Metadata } from "next";

type Props = { params: Promise<{ community_id: number; post_id: number }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { community_id, post_id } = await params;
  const post = await fetchPost(post_id);
  const title = post?.title ?? "게시물";
  const desc = post?.text?.slice(0, 140) ?? ""; // 요약
  const canonical = `${process.env.NEXT_PUBLIC_SITE_URL}/p/${community_id}/${post_id}`;

  return {
    title,
    description: desc,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      url: canonical,
      type: "article",
      images: post?.media_urls?.length
        ? [{ url: post.media_urls[0] }]
        : undefined,
      siteName: "SawIt, 봤어?",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: post?.media_urls?.[0],
    },
    robots: { index: false, follow: false },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ community_id: number; post_id: number }>;
}) {
  const { post_id, community_id } = await params;
  const post = await fetchPost(post_id);
  const community = await fetchCommunity(community_id);
  if (!post) {
    return;
  }

  return (
    <div className="main-container">
      <main className="w-full py-8">
        <PostCard post={post} showComments />
      </main>
      <div className="right-menu-container py-8">
        {community && <CommunityInfo showTitle community={community} />}
      </div>
    </div>
  );
}
