import fetchPostMedia from "@/service/fetch-post-media";

import EditPostForm from "./_components/edit-post-form";
import fetchPost from "@/service/fetch_post";
import { redirect } from "next/navigation";
import PostFormProvider from "../../create/_components/form-provider";
import { PostSettings } from "../../create/_components/post-settings";

export default async function PostEditPage({
  params,
}: {
  params: Promise<{ community_id: number; post_id: number }>;
}) {
  const { post_id } = await params;
  const postMedia = await fetchPostMedia({ post_id });
  const post = await fetchPost(post_id);
  if (!post) {
    redirect("/");
  }
  if (!postMedia) return;

  return (
    <div className="main-container">
      <PostFormProvider
        initialData={{
          title: post.title,
          isPrivate: post.is_spoiler,
          communityId: post.community_id,
          text: post.text || "",
          isSpoiler: post.is_spoiler,
          isNSFW: post.is_nsfw,
          isUploading: false,
          uploadType: "none",
          files: [],
        }}
      >
        <main className="w-full">
          <EditPostForm post={post} postMedia={postMedia} />
        </main>
        <div className="right-menu-container">
          <PostSettings />
        </div>
      </PostFormProvider>
    </div>
  );
}
