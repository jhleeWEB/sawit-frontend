"use client";
import { LiaSignSolid } from "react-icons/lia";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Community } from "../_apis/fetch-community";
import createdAt from "@/lib/dayjs/created-at";
import Link from "next/link";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Props {
  showTitle?: boolean;
  community: Community;
}

export default function CommunityInfo({ showTitle, community }: Props) {
  return (
    <div className="rounded-xl bg-slate-100 text-neutral-800 p-4 mt-8">
      {showTitle && (
        <div className="flex justify-between mb-4">
          <Link href={`/p/${community.id}`} className="text-lg font-semibold">
            p/{community.name}
          </Link>
        </div>
      )}
      <div className="flex flex-col mb-2">
        <small className="font-semibold">{community.name}</small>
        <small className="text-neutral-500">{community.description}</small>
      </div>
      <div className="flex items-center gap-1 text-neutral-500 mb-2">
        <LiaSignSolid size={24} />
        <small>개설</small>
        <small>{createdAt(community.created_at)}</small>
      </div>
      <div className="flex w-full justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <h3>{community.member_count}</h3>
          <small className="text-neutral-500">회원</small>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h3>{community.post_count}</h3>
          <small className="text-neutral-500">게시물</small>
        </div>
      </div>
    </div>
  );
}
