"use client";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TRANSITION = "transform 200ms ease-in-out";
interface Props {
  href: string;
  urls: string[];
}

export default function MediaCarousel({ urls, href }: Props) {
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

  return (
    <div
      className={`relative flex h-full w-full overflow-x-hidden rounded-2xl scrollbar-hide marker:items-center md:max-h-[60vh]`}
    >
      {hasPrev && (
        <Button
          isIconOnly
          variant="flat"
          className="absolute left-[18px] top-[calc(50%-24px)] z-20 rounded-full bg-black/50 opacity-70"
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
          className="absolute right-[18px] top-[calc(50%-24px)] z-20 rounded-full bg-black/50"
          size="sm"
          onPress={next}
        >
          <FaChevronRight size={18} color="white" />
        </Button>
      )}
      {urls.map((url, i) => {
        const isVideo = url.includes("videos");
        return (
          <Link
            href={href}
            key={url + "_" + i}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: `${transition}`,
            }}
            className={`flex min-w-full items-center justify-center overflow-hidden rounded-3xl border`}
          >
            {isVideo ? (
              <video
                src={url}
                controls
                playsInline
                muted
                preload="metadata"
                className="h-auto max-h-[60dvh] w-auto max-w-full object-contain"
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
                src={url}
                radius="none"
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}
