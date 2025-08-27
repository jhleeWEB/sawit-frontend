"use client";

interface Props {
  title: string;
}

export default function PostTitleHeader({ title }: Props) {
  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
