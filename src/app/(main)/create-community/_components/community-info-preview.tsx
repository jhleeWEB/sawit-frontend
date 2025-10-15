"use client";

import { Avatar, Button, Chip, Divider } from "@heroui/react";
import { useCommunityFormState } from "./community-form-provider";

export default function CommunityInfoPreview() {
  const {
    bannerPreview,
    iconPreview,
    name,
    topics,

    description,
  } = useCommunityFormState();

  return (
    <>
      <div className="rounded-xl border-1 bg-white/50 shadow-lg backdrop-blur-sm">
        {bannerPreview ? (
          <div
            style={{
              backgroundImage: `url("${bannerPreview}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`h-[32px] rounded-t-lg bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat`}
          />
        ) : (
          <div className={`h-[32px] rounded-t-lg bg-red-300/50`} />
        )}
        <Divider />
        <div className="flex max-w-full items-center gap-4 p-4 pb-0">
          <Avatar isBordered size="md" className="shrink-0" src={iconPreview} />
          <div className="max-w-[calc(100%-64px)]">
            <h1 className="break-words text-2xl font-bold">p/{name}</h1>
            <div>
              <small>1 member</small>
              <span>•</span>
              <small>1 online</small>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 px-4 pt-2">
          {topics.map((topic) => (
            <Chip
              size="sm"
              variant="bordered"
              className="border-1"
              key={`preview-topics-${topic}`}
            >
              {topic}
            </Chip>
          ))}
        </div>
        <p className="break-words p-4">{description}</p>
      </div>
      <div className="mt-4">
        <Button
          fullWidth
          radius="full"
          color="primary"
          form="community-form"
          type="submit"
        >
          커뮤니티 만들기
        </Button>
      </div>
    </>
  );
}
