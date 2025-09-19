"use client";
import FormTitle from "@/app/(main)/create-community/_components/form-title";
import { PostMedia } from "@/service/fetch-post-media";
import { Post } from "@/service/fetch_post";
import { Button, Form, Input } from "@heroui/react";
import { FormEvent, useState } from "react";
import PreviewCarousel, { PreviewCarouselValue } from "./preview-carousel";
import updatePost from "@/service/update-post";

interface Props {
  post: Post;
  postMedia: PostMedia[];
}

export default function EditPostForm({ post, postMedia }: Props) {
  const [title, setTitle] = useState(() => post.title);
  const [text, setText] = useState(() => post.text);
  const [media, setMedia] = useState<PreviewCarouselValue[]>(() =>
    postMedia.map((n) => ({ url: n.url, status: "published", path: n.path }))
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const removedFiles = [];
    const addedFiles = [];
    for (const m of media) {
      switch (m.status) {
        case "removed":
          removedFiles.push(m);
        case "draft":
          addedFiles.push(m);
        default:
          break;
      }
    }

    const update = await updatePost({
      post_id: post.id,
      title,
      text: text || "",
      media,
    });
    console.log(update);
  };

  return (
    <Form
      id="community-post-form"
      className="flex flex-col"
      onSubmit={handleSubmit}
    >
      <FormTitle
        title="수정하기
      "
      />
      {/** 게시물을 올릴 커뮤니티 선택 검샘 창 */}
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
        <PreviewCarousel values={media} onValueChange={setMedia} />
      </div>

      <div className="w-full flex justify-end gap-2">
        <Button radius="full" color="primary" type="submit">
          수정하기
        </Button>
      </div>
    </Form>
  );
}
