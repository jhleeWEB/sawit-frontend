"use client";
import { Tab, Tabs } from "@heroui/react";
import MyComments from "./my-comments";

export default function UserActivity({ userId }: { userId: string }) {
  return (
    <div>
      <Tabs fullWidth radius="full">
        <Tab key="comments" title="댓글">
          <MyComments userId={userId} />
        </Tab>
        <Tab key="posts" title="게시물">
          ㅇ
        </Tab>
        <Tab key="liked" title="좋아요 게시물">
          ㅇ
        </Tab>
        <Tab key="disliked" title="싫어요 게시물">
          ㅇ
        </Tab>
        <Tab key="history" title="기록">
          ㅇ
        </Tab>
      </Tabs>
    </div>
  );
}
