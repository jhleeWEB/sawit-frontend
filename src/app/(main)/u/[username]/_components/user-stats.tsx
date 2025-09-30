import { createdAt } from "@/lib/dayjs/date-utils";
import { User } from "@/service/fetch-user";

interface Props {
  user: User;
}

export default async function UserStats({ user }: Props) {
  return (
    <div className="w-full bg-slate-50 p-4 rounded-2xl">
      <h2 className="text=lg font-semibold">p/{user.username}</h2>
      <div className="flex gap-2">
        <small>가입</small>
        <small>{createdAt(user.created_at)}</small>
      </div>
      <div className="flex justify-evenly text-center">
        <div>
          <h3 className="text-gray-700">{user.post_count}</h3>
          <small>게시물</small>
        </div>
        <div>
          <h3 className="text-gray-700">{user.comment_count}</h3>
          <small>댓글</small>
        </div>
        <div>
          <h3 className="text-gray-700">{user.community_count}</h3>
          <small>커뮤니티 운영</small>
        </div>
      </div>
    </div>
  );
}
