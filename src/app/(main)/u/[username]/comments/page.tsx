import fetchMyComments from "@/service/fetch-my-comments";

import MyComment from "../_components/my-comment";

export default async function MyCommentsPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const comments = await fetchMyComments(username);

  return (
    <div>
      {comments ? (
        comments.map((comment) => (
          <MyComment key={"my_comment_" + comment.id} comment={comment} />
        ))
      ) : (
        <div className="w-full text-center">게시한 댓글이 없습니다.</div>
      )}
    </div>
  );
}
