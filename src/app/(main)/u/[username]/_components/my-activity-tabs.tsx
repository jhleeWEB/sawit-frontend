"use client";
import { Tab, Tabs } from "@heroui/react";
import { useParams, usePathname } from "next/navigation";

const tabKeys = ["/", "comments", "posts", "likes", "dislikes", "history"];

export default function MyActivityTabs({ isOwner }: { isOwner: boolean }) {
  const pathname = usePathname();
  const { username } = useParams();
  const lastPath = pathname.split("/").pop();
  const isValid = tabKeys.includes(lastPath || "");
  const selectedKey = isValid ? lastPath : "/";

  return (
    <Tabs
      radius="full"
      fullWidth
      selectedKey={selectedKey}
      className="mb-4 px-2 sm:px-0"
    >
      <Tab title="개요" key="/" href={`/u/${username}`} />
      <Tab title="댓글" key="comments" href={`/u/${username}/comments`} />
      <Tab title="게시물" key="posts" href={`/u/${username}/posts`} />
      {isOwner && (
        <>
          <Tab
            title="좋아요 누른 게시물"
            key="likes"
            href={`/u/${username}/likes`}
          />
          <Tab
            title="싫어요 누른 게시물"
            key="dislikes"
            href={`/u/${username}/dislikes`}
          />
          <Tab title="기록" key="history" href={`/u/${username}/history`} />
        </>
      )}
    </Tabs>
  );
}
