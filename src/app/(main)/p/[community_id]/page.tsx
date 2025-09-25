"use server";
import CommunityHeader from "./_components/community-header";
import EmptyPost from "./_components/empty-post";
import fetchCommunityFeeds from "@/service/fetch-community-feeds";
import fetchCommunity from "@/service/fetch-community";
import CommunityInfo from "@/features/community-info";
import PostCard from "@/features/post-card/post-card";

import type { Metadata } from "next";

// 길이 제한 헬퍼(선택)
const clip = (s?: string, n = 160) =>
  (s ?? "").replace(/\s+/g, " ").trim().slice(0, n);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ community_id: number }>;
}): Promise<Metadata> {
  const { community_id } = await params;
  const community = await fetchCommunity(community_id);

  if (!community) {
    return {
      title: "커뮤니티를 찾을 수 없습니다",
      description: "요청하신 커뮤니티가 존재하지 않거나 비공개입니다.",
      robots: { index: false, follow: false },
      alternates: { canonical: `/community/${community_id}` },
    };
  }

  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "YourSite";
  const title = `${community.name} 커뮤니티 | ${siteName}`;
  const desc =
    clip(community.description) ||
    `${community.name} 커뮤니티의 최신 글과 정보를 확인하세요.`;

  const canonical = `/community/${community_id}`;
  const ogImage =
    community.banner_url || community.icon_url || "/og/community-default.png";

  // topics가 있다면 키워드에 반영
  const keywords: string[] | undefined = Array.isArray(community.topics)
    ? community.topics.filter(Boolean)
    : undefined;

  return {
    title,
    description: desc,
    keywords,
    alternates: { canonical },
    openGraph: {
      title,
      description: desc,
      type: "website",
      url: canonical,
      siteName,
      locale: "ko_KR",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: desc,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ community_id: number }>;
}) {
  const { community_id } = await params;

  const community = await fetchCommunity(community_id);
  const feeds = await fetchCommunityFeeds(community_id);

  if (!community) {
    return;
  }

  return (
    <div className="main-container">
      <CommunityHeader community={community} />
      <main className="w-full">
        {feeds ? (
          <div>
            {feeds.map((post) => (
              <PostCard key={`${post.username}_${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPost />
        )}
      </main>
      <div className="right-menu-container" style={{ top: "128px" }}>
        <CommunityInfo community={community} />
      </div>
    </div>
  );
}
