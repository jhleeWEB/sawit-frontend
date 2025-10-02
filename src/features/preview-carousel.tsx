"use client";

import { Button, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DropzoneInputProps } from "react-dropzone";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiTrashSimpleThin } from "react-icons/pi";

const TRANSITION = "transform 200ms ease-in-out";

interface Props {
  urls: string[];
  onRemove: (index: number) => void;
  getInputProps: <T extends DropzoneInputProps>(any?: T) => T;
}

export default function PreviewCarousel({
  urls,
  onRemove,
  getInputProps,
}: Props) {
  const wrappeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const next = useCallback(() => {
    const length = urls.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, urls]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = urls.length - 1;

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
  }, [urls, currentIndex]);

  useEffect(() => {
    setCurrentIndex(urls.length - 1);
  }, [urls]);

  return (
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
      {urls && (
        <label
          htmlFor="upload"
          className="absolute z-10 top-[18px] left-[18px] rounded-full bg-black/50 cursor-pointer text-neutral-100 text-[14px] p-1 px-4 hover:bg-black/10 transition-colors duration-300 ease-in-out"
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

      {urls.map((urls, i) => {
        return (
          <Link
            key={"image" + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
              backgroundImage: `url("${urls}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`rounded-xl min-w-full border`}
          >
            <div className="absolute top-0 left-0 flex justify-center min-w-full bg-white/60 backdrop-blur-3xl">
              <Button
                isIconOnly
                variant="light"
                className="absolute z-10 top-[18px] right-[18px] rounded-full bg-black/50"
                size="sm"
                onPress={() => onRemove(i)}
              >
                <PiTrashSimpleThin size={18} color="white" />
              </Button>
              {
                <Image
                  alt={"event-images" + i}
                  height={400}
                  src={urls}
                  radius="none"
                />
              }
            </div>
          </Link>
        );
      })}
    </div>
  );
}
