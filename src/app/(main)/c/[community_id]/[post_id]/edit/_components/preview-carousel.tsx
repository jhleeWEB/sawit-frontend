"use client";

import { Button, Image } from "@heroui/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { PiXCircleBold, PiTrashSimple } from "react-icons/pi";
import { GrRevert } from "react-icons/gr";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { compressImageToMaxBytes } from "@/utils/image-compression/compress-image-to-max-bytes";
import { MB } from "@/utils/consts";

const TRANSITION = "transform 200ms ease-in-out";

export interface PreviewCarouselValue {
  url: string;
  file?: File;
  isVideo?: boolean;
  status?: "published" | "draft" | "removed";
  path?: string;
}
interface Props {
  values: PreviewCarouselValue[];
  onValueChange: Dispatch<SetStateAction<PreviewCarouselValue[]>>;
}

export default function PreviewCarousel({ values, onValueChange }: Props) {
  const wrappeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const remove = useCallback(
    (index: number) => {
      onValueChange((prev) => {
        const temp = [...prev];
        temp[index] = { ...temp[index], status: "removed" };
        return temp;
      });
    },
    [onValueChange],
  );
  const revert = useCallback(
    (value: PreviewCarouselValue, index: number) => {
      onValueChange((prev) => {
        const temp = [...prev];
        temp[index] = {
          ...temp[index],
          status: value.file ? "draft" : "published",
        };
        return temp;
      });
    },
    [onValueChange],
  );
  const next = useCallback(() => {
    const length = values.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, values]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = values.length - 1;

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
  }, [values, currentIndex]);

  const add = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      onValueChange((prev) => {
        return prev.toSpliced(currentIndex, 0, {
          url,
          file: file,
          status: "draft",
        });
      });
    },
    [onValueChange, currentIndex],
  );

  const onDrop = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const accepted = e.currentTarget.files;
      if (!accepted) {
        return;
      }

      for (let i = 0; i < accepted.length; i++) {
        const originalFile = accepted[i];
        try {
          let file = originalFile;
          //파일 사이즈 및 타입 체크
          const isImage = originalFile.type.startsWith("image/");
          const isTooBig = originalFile.size >= 10 * MB;
          if (isImage) {
            if (isTooBig) {
              file = await compressImageToMaxBytes(file, { maxBytes: 10 * MB });
            }
            add(file);
          } else {
            //비디오 처리
          }
        } catch {}
      }
    },
    [add],
  );

  return (
    <>
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
            onPress={next}
          >
            <FaChevronRight size={18} color="white" />
          </Button>
        )}
        <label
          htmlFor="upload"
          className="absolute left-[18px] top-[18px] z-10 cursor-pointer rounded-full bg-black/50 p-1 px-4 text-[14px] text-neutral-100 transition-colors duration-300 ease-in-out hover:bg-black/10"
        >
          추가
          <input
            name="files"
            id="upload"
            type="file"
            multiple
            style={{ display: "none" }}
            onChange={onDrop}
          />
        </label>

        {values.map((value, i) => {
          return (
            <div
              key={"image" + "_" + i}
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: `${transition}`,
              }}
              className={`flex min-w-full items-center justify-center overflow-hidden rounded-3xl border`}
            >
              {value.status !== "removed" ? (
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute right-[18px] top-[18px] z-20 rounded-full bg-black/50"
                  size="sm"
                  onPress={() => remove(i)}
                >
                  <PiTrashSimple size={18} color="white" />
                </Button>
              ) : (
                <Button
                  isIconOnly
                  variant="light"
                  className="absolute right-[18px] top-[18px] z-20 rounded-full bg-black/50"
                  size="sm"
                  onPress={() => revert(value, i)}
                >
                  <GrRevert size={18} color="white" />
                </Button>
              )}

              {value.isVideo ? (
                <video
                  src={value.url}
                  controls
                  playsInline
                  muted // iOS 인라인 자동재생용(필요 시)
                  preload="metadata"
                  className="h-auto max-h-[60dvh] w-auto object-contain"
                />
              ) : (
                <Image
                  alt={"event-images" + i}
                  sizes="100vw"
                  style={{
                    height: "auto",
                    width: "100%",
                    maxWidth: "100dvw",
                    maxHeight: "60dvh",
                  }}
                  src={value.url}
                  radius="none"
                />
              )}
              {value.status === "removed" && (
                <PiXCircleBold
                  size={100}
                  className="absolute z-10 h-full w-full text-center text-danger-400"
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex w-full gap-1 rounded-xl bg-black/30 p-1">
        {values.map((value, i) => {
          return (
            <div key={`mini_preview_indicator_${i}`} className="relative">
              {value.isVideo ? (
                <video
                  src={`${value.url}`}
                  playsInline
                  muted
                  preload="metadata"
                  className="h-auto max-h-[100px] w-auto max-w-[100px] rounded-md object-contain"
                />
              ) : (
                <Image
                  radius="sm"
                  isZoomed
                  classNames={{
                    wrapper: `${
                      currentIndex === i ? "opacity-100" : "opacity-40"
                    } cursor-pointer`,
                    img: "max-h-[100px]",
                  }}
                  alt={`mini_preview_indicator_${i}`}
                  src={value.url}
                  onClick={() => setCurrentIndex(i)}
                />
              )}

              {value.status === "removed" && (
                <PiXCircleBold
                  size={100}
                  className="absolute left-0 top-0 z-20 h-full w-full rounded-md text-center text-danger-500"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
