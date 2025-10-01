import PostCard from "@/features/post-card/post-card";
import MyComment from "../_components/my-comment";
import fetchMyDislikedContents from "@/service/fetch-my-disliked-contents";

export default async function MyLikedContentsPage() {
  const contents = await fetchMyDislikedContents();
  return (
    <div>
      {contents ? (
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
        <div className="w-full text-center">게시한 댓글이 없습니다.</div>
      )}
    </div>
  );
}
