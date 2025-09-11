"use client";
import { Post } from "@/service/fetch_post";
import Header from "./header";

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
  return (
    <div>
      <Header icon={icon} name={name} created_at={post.created_at} />
      <h1 className="text-2xl font-bold">{post.title}</h1>
    </div>
  );
}
