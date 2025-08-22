import { Chip } from "@heroui/react";
import { useMemo } from "react";

interface Props {
  title?: string;
  selectedTopics: string[];
  topics: string[];
  filter: string;
  onClose: (topic: string) => void;
  onClick: (topic: string) => void;
}

export default function TopicChips({
  title,
  selectedTopics,
  filter,
  topics,
  onClick,
  onClose,
}: Props) {
  const filtered = useMemo(
    () => topics.filter((topic) => topic.includes(filter)),
    [topics, filter]
  );
  if (filtered.length === 0) {
    return;
  }
  return (
    <div className="flex flex-col">
      <h2 className="text-[18px] font-bold">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {filtered.map((topic) =>
          selectedTopics.find((n) => n === topic) ? (
            <Chip
              variant="bordered"
              className="border-1 border-teal-400 cursor-pointer"
              classNames={{
                closeButton: "text-teal-400",
              }}
              onClose={() => onClose(topic)}
              size="sm"
              key={`anime-topic-${topic}`}
            >
              {topic}
            </Chip>
          ) : (
            <Chip
              variant="bordered"
              className="border-1 cursor-pointer"
              onClick={() => onClick(topic)}
              size="sm"
              key={`anime-topic-${topic}`}
            >
              {topic}
            </Chip>
          )
        )}
      </div>
    </div>
  );
}
