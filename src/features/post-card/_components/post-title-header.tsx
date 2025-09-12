"use client";
import { Post } from "@/service/fetch_post";
import Header from "./header";
import Link from "next/link";

interface Props {
  post: Post;
  headerInfo?: "user" | "community";
}

export default function PostTitleHeader({ post, headerInfo = "user" }: Props) {
  const icon = headerInfo === "user" ? post.owner_icon : post.community_icon;
  const name =
    headerInfo === "user"
      ? "u/" + post.owner_username
      : "p/" + post.community_name;
  const headerHref =
    headerInfo === "user" ? `/u/${post.owner_id}` : `/p/${post.community_id}`;
  return (
    <div>
      <Header
        icon={icon}
        name={name}
        href={headerHref}
        created_at={post.created_at}
        expires_at={post.expires_at}
      />
      <Link
        href={`/p/${post.community_id}/${post.id}`}
        className="text-2xl font-bold"
      >
        {post.title}
      </Link>
    </div>
  );
}
