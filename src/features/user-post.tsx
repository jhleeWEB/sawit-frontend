import createdAt from "@/lib/dayjs/created-at";
import { Post } from "@/service/fetch_post";
import { Avatar, Button } from "@heroui/react";
import {
  PiArrowFatLineDownThin,
  PiArrowFatLineUpThin,
  PiChatCircleDotsThin,
  PiDotsThreeOutlineThin,
  PiShareFatThin,
} from "react-icons/pi";
import MediaCarousel from "./user-post-detail/_components/media-carousel";

interface Props {
  post: Post;
}

export default function UserPost({ post }: Props) {
  return (
    <a className="flex flex-col w-full border rounded-lg p-4 gap-2 hover:bg-slate-50">
      <span className="flex w-full justify-between">
        <span className="flex max-w-[50%] flex-wrap items-center gap-1">
          <span className="flex items-center">
            <Avatar
              className="shrink-0 w-[24px] h-[24px] mr-2"
              src={post.owner_icon}
            />
            <small className="text-nowrap font-semibold">
              u/{post.owner_username}
            </small>
          </span>
          <span>•</span>
          <small className="text-nowrap">{createdAt(post.created_at)}</small>
        </span>

        <div className="flex items-center gap-2">
          <PiDotsThreeOutlineThin size={20} />
        </div>
      </span>
      <h3>포스트 타이틀은 여기에 넣어요.</h3>
      <MediaCarousel urls={post.media} />
      {/* 하단 버튼 그룹 */}
      <div className="flex gap-2">
        {/* 올려/내려 버튼 그룹 */}
        <div className="flex items-center bg-default-300 rounded-full">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="hover:bg-default-200"
          >
            <PiArrowFatLineUpThin size={20} className="hover:text-red-500" />
          </Button>
          <small>{post.likes - post.dislikes}</small>
          <Button
            isIconOnly
            radius="full"
            size="sm"
            className="hover:bg-default-200"
          >
            <PiArrowFatLineDownThin size={20} className="hover:text-blue-500" />
          </Button>
        </div>
        {/* 댓글 버튼 */}
        <Button radius="full" size="sm" className="hover:bg-default-200">
          <PiChatCircleDotsThin size={20} />
          <small className="text-[13px]">{0}</small>
        </Button>
        {/* 공유하기 버튼 */}
        <Button radius="full" size="sm" className="hover:bg-default-200">
          <PiShareFatThin size={20} />
          <small className="text-[13px]">공유</small>
        </Button>
      </div>
    </a>
  );
}
