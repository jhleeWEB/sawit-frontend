"use client";
import { LiaSignSolid } from "react-icons/lia";

interface Props {
  created_at: Date;
  description: string;
}

export default function CommunityInfo({ description, created_at }: Props) {
  return (
    <div className="sticky top-0 bg-slate-50 p-4">
      <p>{description}</p>
      <div className="flex">
        <LiaSignSolid />
        <small>개설일자</small>
        <small>{new Date(created_at).toLocaleDateString()}</small>
      </div>
      <div className="flex gap-4">
        <div>
          <h3 className="text-gray-700">34</h3>
          <small>회원</small>
        </div>
        <div>
          <h3 className="text-gray-700">33,424</h3>
          <small>게시물</small>
        </div>
      </div>
    </div>
  );
}
