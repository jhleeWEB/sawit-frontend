import fetchUser from "../../../../service/fetch-user";
import fetchMyContents from "@/service/fetch-my-contents";
import MyComment from "./_components/my-comment";
import PostCard from "@/features/post-card/post-card";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);
  const user = await fetchUser({ username: decodedUsername });
  if (!user) return { title: "사용자 없음" };

  return {
    title: `${user.username} 프로필 - Sawit`,
    description: `${user.username}님의 활동 내역과 통계를 확인하세요.`,
    openGraph: {
      title: `${user.username} 프로필`,
      images: [user.image],
    },
  };
}

export default async function UserPage() {
  const contents = await fetchMyContents();
  if (!contents) return;

  return (
    <div>
      {contents && contents.length > 0 ? (
        contents.map((content) => {
          if (content.comment) {
            return (
              <MyComment key={"my_comment_" + content.id} comment={content} />
            );
          } else {
            return <PostCard key={"my_post_" + content.id} post={content} />;
          }
        })
      ) : (
        <div className="w-full text-center">싫어요 누른 게시물이 없습니다.</div>
      )}
    </div>
  );
}
