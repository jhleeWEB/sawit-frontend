import { createdAt } from "@/lib/dayjs/date-utils";
import fetchUser from "@/service/fetch-user";
import { Avatar, Button, Divider, Link } from "@heroui/react";

interface Props {
  username: string;
}

export default async function UserStats({ username }: Props) {
  const user = await fetchUser({ username });
  if (!user) return;
  return (
    <div className="w-full bg-slate-50 p-4 rounded-2xl mt-8">
      <h2 className="text=lg font-semibold">p/{user.username}</h2>
      <section className="flex gap-2">
        <small>가입</small>
        <small>{createdAt(user.created_at)}</small>
      </section>
      <section className="flex justify-evenly text-center">
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
      </section>
      <Divider className="my-2" />
      <small>설정</small>
      <section>
        <div className="flex justify-between">
          <span className="flex gap-2">
            <Avatar size="sm" src={user.image} />
            <span className="flex flex-col">
              <small className="font-semibold">프로필</small>
              <small>프로필을 설정해 보세요.</small>
            </span>
          </span>
          <Button radius="full" size="sm" as={Link} href={`/settings/account`}>
            업데이트
          </Button>
        </div>
      </section>
    </div>
  );
}
