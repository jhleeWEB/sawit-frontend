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
import { MB } from "@/utils/image-compression/types";

const TRANSITION = "transform 200ms ease-in-out";

export interface PreviewCarouselValue {
  url: string;
  file?: File;
  status?: string;
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
    [onValueChange]
  );
  const revert = useCallback(
    (value: PreviewCarouselValue, index: number) => {
      onValueChange((prev) => {
        const temp = [...prev];
        temp[index] = {
          ...temp[index],
          status: value.file ? "draft" : "publish",
        };
        return temp;
      });
    },
    [onValueChange]
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
          file,
          status: "draft",
        });
      });
    },
    [onValueChange, currentIndex]
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
    [add]
  );

  return (
    <>
      <div
        ref={wrappeRef}
        className="relative h-[400px] flex w-full overflow-hidden scrollbar-hide rounded-xl"
      >
        {hasPrev && (
          <Button
            isIconOnly
            variant="flat"
            className="absolute z-10 top-[calc(50%-24px)] left-[18px] rounded-full opacity-70 bg-black/50"
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
            className="absolute z-10 top-[calc(50%-24px)] right-[18px] rounded-full bg-black/50"
            size="sm"
            onPress={next}
          >
            <FaChevronRight size={18} color="white" />
          </Button>
        )}
        <label
          htmlFor="upload"
          className="absolute z-10 top-[18px] left-[18px] rounded-full bg-black/50 cursor-pointer text-neutral-100 text-[14px] p-1 px-4 hover:bg-black/10 transition-colors duration-300 ease-in-out"
        >
          추가
          <input
            name="files"
            id="upload"
            type="file"
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
                backgroundImage: `url("${value.url}")`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`rounded-xl min-w-full border`}
            >
              <div className="absolute top-0 left-0 flex justify-center min-w-full bg-white/60 backdrop-blur-3xl">
                {value.status !== "removed" ? (
                  <Button
                    isIconOnly
                    variant="light"
                    className="absolute z-10 top-[18px] right-[18px] rounded-full bg-black/50"
                    size="sm"
                    onPress={() => remove(i)}
                  >
                    <PiTrashSimple size={18} color="white" />
                  </Button>
                ) : (
                  <Button
                    isIconOnly
                    variant="light"
                    className="absolute z-20 top-[18px] right-[18px] rounded-full bg-black/50"
                    size="sm"
                    onPress={() => revert(value, i)}
                  >
                    <GrRevert size={18} color="white" />
                  </Button>
                )}

                {
                  <Image
                    alt={"event-images" + i}
                    height={400}
                    src={value.url}
                    radius="none"
                  />
                }
                {value.status === "removed" && (
                  <PiXCircleBold
                    size={100}
                    className="z-10 absolute w-full h-full text-center text-danger-400"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex overflow-x-auto p-1 gap-1 bg-black/30 rounded-xl mt-4">
        {values.map((value, i) => {
          return (
            <div key={`mini_preview_indicator_${i}`} className="relative">
              <Image
                radius="sm"
                isZoomed
                classNames={{
                  wrapper: `${
                    currentIndex === i ? "opacity-100" : "opacity-40"
                  } cursor-pointer`,
                }}
                alt={`mini_preview_indicator_${i}`}
                src={value.url}
                onClick={() => setCurrentIndex(i)}
              />

              {value.status === "removed" && (
                <PiXCircleBold
                  size={100}
                  className="z-20 absolute top-0 left-0 w-full h-full text-center text-danger-500 rounded-md"
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
