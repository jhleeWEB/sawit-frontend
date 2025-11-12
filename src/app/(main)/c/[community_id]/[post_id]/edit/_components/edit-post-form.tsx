"use client";
import FormTitle from "@/app/(main)/create-community/_components/form-title";
import { PostMedia } from "@/service/fetch-post-media";
import { Post } from "@/service/fetch_post";
import { Avatar, Button, Form, Input } from "@heroui/react";
import { FormEvent, useState } from "react";
import PreviewCarousel, { PreviewCarouselValue } from "./preview-carousel";
import updatePost from "@/service/update-post";
import { useRouter } from "next/navigation";
import SimpleEditor from "./editor";
import { usePostFormState } from "../../../create/_components/form-provider";

interface Props {
  post: Post;
  postMedia: PostMedia[];
}

export default function EditPostForm({ post, postMedia }: Props) {
  const router = useRouter();
  const state = usePostFormState();
  // 임시적으로 Context와 useState 동시 사용
  const [title, setTitle] = useState(() => post.title);
  const [text, setText] = useState(() => post.text);
  const [media, setMedia] = useState<PreviewCarouselValue[]>(() =>
    postMedia.map((n) => ({
      url: n.url,
      isVideo: n.mime.startsWith("video/"),
      status: "published",
      path: n.path,
    })),
  );
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const update = await updatePost({
      post_id: post.id,
      title,
      text: text || "",
      media,
      isPrivate: state.isPrivate || false,
      isSpoiler: state.isSpoiler || false,
      isNSFW: state.isNSFW || false,
    });
    setUploading(false);
    if (update) {
      router.push(`/c/${update.community_id}/${update.id}`);
    }
  };

  return (
    <Form
      id="community-post-form"
      className="flex flex-col px-4"
      onSubmit={handleSubmit}
    >
      <FormTitle title="수정하기" />
      <div className="flex items-center gap-2 rounded-full border-2 px-2 py-1">
        <Avatar size="sm" src={post.community_icon} />
        <h3>p/{post.community_name}</h3>
      </div>
      {/** 게시물을 올릴 커뮤니티 선택 검색 창 */}
      <Input
        isRequired
        name="title"
        variant="bordered"
        placeholder="제목"
        value={title}
        onValueChange={setTitle}
        validate={(value) => {
          if (value.length > 200) {
            return "제목은 최소 200글자 이하로 입력해주세요";
          }
          if (value.length < 1) {
            return "제목은 최소 1글자 이상은 입력해주세요";
          }
        }}
      />
      <div className="flex w-full flex-col">
        {post.type === "media" && (
          <PreviewCarousel values={media} onValueChange={setMedia} />
        )}
        {post.type === "text" && <SimpleEditor text={text} setText={setText} />}
      </div>

      <div className="flex w-full justify-end gap-2">
        <Button
          radius="full"
          color="primary"
          type="submit"
          disabled={uploading}
          isLoading={uploading}
        >
          수정하기
        </Button>
      </div>
    </Form>
  );
}
