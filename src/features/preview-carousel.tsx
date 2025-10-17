"use client";

import { usePostFormState } from "@/app/(main)/c/[community_id]/create/_components/form-provider";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { DropzoneInputProps } from "react-dropzone";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiTrashSimpleThin } from "react-icons/pi";

const TRANSITION = "transform 200ms ease-in-out";

interface Props {
  previews: { url: string; type: "image" | "video" | string }[];
  onRemove: (index: number) => void;
  getInputProps: <T extends DropzoneInputProps>(any?: T) => T;
}

export default function PreviewCarousel({
  previews,
  onRemove,
  getInputProps,
}: Props) {
  const formState = usePostFormState();
  const wrappeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const next = useCallback(() => {
    const length = previews.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, previews]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = previews.length - 1;

    if (currentIndex >= length) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }

    if (currentIndex === 0) {
      setHasPrev(false);
    } else {
      setHasPrev(true);
    }
  }, [previews, currentIndex]);

  useEffect(() => {
    setCurrentIndex(previews.length - 1);
  }, [previews]);

  return (
    <div
      ref={wrappeRef}
      className="relative flex h-auto max-h-[60vh] w-full overflow-x-hidden rounded-2xl scrollbar-hide marker:items-center"
    >
      {hasPrev && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute left-[18px] top-[calc(50%-24px)] z-10 rounded-full bg-black/50 opacity-70"
          size="sm"
          isDisabled={formState.isUploading}
          onPress={prev}
        >
          <FaChevronLeft size={18} color="white" />
        </Button>
      )}
      {hasNext && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute right-[18px] top-[calc(50%-24px)] z-10 rounded-full bg-black/50"
          size="sm"
          isDisabled={formState.isUploading}
          onPress={next}
        >
          <FaChevronRight size={18} color="white" />
        </Button>
      )}

      {previews.map((preview, i) => {
        return (
          <Link
            href=""
            key={"image" + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
            }}
            className={`flex min-w-full items-center justify-center rounded-2xl border`}
          >
            {previews && (
              <label
                htmlFor="upload"
                className="absolute left-[18px] top-[18px] z-10 cursor-pointer rounded-full bg-black/50 p-1 px-4 text-[14px] text-neutral-100 transition-colors duration-300 ease-in-out hover:bg-black/10"
              >
                추가
                <input
                  {...getInputProps()}
                  name="files"
                  id="upload"
                  type="file"
                  style={{ display: "none" }}
                />
              </label>
            )}
            <Button
              isIconOnly
              variant="light"
              className="absolute right-[18px] top-[18px] z-10 rounded-full bg-black/50"
              size="sm"
              isDisabled={formState.isUploading}
              onPress={() => onRemove(i)}
            >
              <PiTrashSimpleThin size={18} color="white" />
            </Button>
            {preview.type === "image" ? (
              <Image
                alt={"event-images" + i}
                sizes="100vw"
                style={{
                  height: "auto",
                  width: "auto",
                  maxWidth: "100vw",
                  maxHeight: "60vh",
                }}
                src={preview.url}
                radius="none"
              />
            ) : (
              <video
                src={preview.url}
                controls
                playsInline
                muted // iOS 인라인 자동재생용(필요 시)
                preload="metadata"
                className="h-auto max-h-[60vh] w-auto object-contain"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
