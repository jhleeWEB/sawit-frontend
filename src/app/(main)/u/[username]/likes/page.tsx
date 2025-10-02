import PostCard from "@/features/post-card/post-card";
import MyComment from "../_components/my-comment";
import fetchMyLikedContents from "@/service/fetch-my-liked-contents";

export default async function MyLikedContentsPage() {
  const contents = await fetchMyLikedContents();
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
        <div className="w-full text-center">
          좋아요를 누른 게시물이 없습니다.
        </div>
      )}
    </div>
  );
}
