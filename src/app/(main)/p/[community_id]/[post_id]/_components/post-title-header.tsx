import { Avatar } from "@heroui/react";
import { Post } from "../../create/_apis/create-new-post";
import fetchOwnerInfo from "../_apis/fetch_user";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import fetchCommunity from "../_apis/fetch_community";

dayjs.extend(relativeTime);
dayjs.locale("ko");

interface Props {
  post: Post;
}

export default async function PostTitleHeader({ post }: Props) {
  const owner = await fetchOwnerInfo(post.owner_id);
  const community = await fetchCommunity(post.community_id);

  if (!owner || !community) {
    return;
  }

  console.log(post.created_at);
  return (
    <div>
      <div className="flex items-center gap-2 ">
        <Avatar size="md" src={community.icon_url} className="shrink-0" />
        <div className="flex flex-col gap-0 text-gray-500">
          <div className="flex items-center gap-1">
            <small className="font-bold text-gray-700">
              p/{community.name}
            </small>
            <span>·</span>
            <small>{dayjs(post.created_at).fromNow()}</small>
          </div>
          <small>{owner.name}</small>
        </div>
      </div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
    </div>
  );
}
