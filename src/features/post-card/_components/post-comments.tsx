"use client";
import { Comment } from "@/service/fetch_comments";
import Header from "./header";

interface Props {
  comments: Comment[];
}

export default function PostComments({ comments }: Props) {
  return (
    <div className="w">
      {comments.map((comment) => {
        return (
          <article key={comment.id}>
            <Header
              icon={comment.owner_icon}
              name={comment.owner_username}
              created_at={comment.created_at}
            />
            <p className="pl-[28px]">comment here</p>
          </article>
        );
      })}
    </div>
  );
}
