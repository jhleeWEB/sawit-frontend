"use client";
import { Button, Image, Link } from "@heroui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { PiTrashSimpleThin } from "react-icons/pi";

const TRANSITION = "transform 200ms ease-in-out";

interface Props {
  files: { preview: string }[];
  onRemove: (index: number) => void;
}

export default function PreviewCarousel({ files, onRemove }: Props) {
  const wrappeRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [transition, setTransition] = useState("");

  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const next = useCallback(() => {
    const length = files.length - 1;
    if (currentIndex < length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex, files]);

  const prev = useCallback(() => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setTransition(TRANSITION);
    }
  }, [currentIndex]);

  /** handle side effects of current index */
  useEffect(() => {
    const length = files.length - 1;

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
  }, [files, currentIndex]);

  useEffect(() => {
    setCurrentIndex(files.length - 1);
  }, [files]);

  return (
    <div
      ref={wrappeRef}
      className="relative h-[300px] flex w-full overflow-hidden scrollbar-hide rounded-lg"
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

      {files.map((n, i) => {
        return (
          <Link
            key={n + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
              /**@ts-expect-error custom property */
              "--image-url": `url(${n.preview})`,
            }}
            className={`rounded-xl min-w-full border bg-[image:var(--image-url)] bg-cover bg-center`}
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
              <Image
                alt={"event-images" + i}
                height={300}
                src={n.preview}
                radius="none"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
