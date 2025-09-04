"use client";
import { LiaSignSolid } from "react-icons/lia";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Community } from "../_apis/fetch-community";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Props {
  showTitle?: boolean;
  community: Community;
}

export default function CommunityInfo({ showTitle, community }: Props) {
  return (
    <div className="bg-slate-50 p-4">
      {showTitle && (
        <h2 className="text=lg font-semibold">p/{community.name}</h2>
      )}
      <p>{community.description}</p>
      <div className="flex">
        <LiaSignSolid />
        <small>개설일자</small>
        <small>{dayjs(community.created_at).fromNow()}</small>
      </div>
      <div className="flex gap-4">
        <div>
          <h3 className="text-gray-700">{community.member_count}</h3>
          <small>회원</small>
        </div>
        <div>
          <h3 className="text-gray-700">{community.post_count}</h3>
          <small>게시물</small>
        </div>
      </div>
    </div>
  );
}
