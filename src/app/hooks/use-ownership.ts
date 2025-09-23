import fetchCommunity from "@/service/fetch-community";
import fetchComments from "@/service/fetch_comments";
import fetchPost from "@/service/fetch_post";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export default function useOwnership({
  post_id,
  //comment_id,
  community_id,
}: {
  post_id?: number;
  community_id?: number;
  comment_id?: number;
}) {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const checkPost = useCallback(async () => {
    const uid = session.data?.user.id;
    if (post_id) {
      const post = await fetchPost(post_id);
      if (uid === post?.owner_id) {
        setIsOwner(true);
      }
    }
  }, [post_id, session]);

  const checkComment = useCallback(async () => {
    const uid = session.data?.user.id;
    if (post_id) {
      const comment = await fetchComments(post_id);
      if (comment) {
        if (uid === comment[0].owner_id) {
          setIsOwner(true);
        }
      }
    }
  }, [post_id, session]);

  const checkCommunity = useCallback(async () => {
    const uid = session.data?.user.id;
    if (community_id) {
      const community = await fetchCommunity(community_id);

      if (uid === community?.owner_id) {
        setIsOwner(true);
      }
    }
  }, [community_id, session]);

  useEffect(() => {
    setIsLoading(true);
    checkPost();
    checkCommunity();
    checkComment();
    setIsLoading(false);
  }, [checkPost, checkCommunity, checkComment]);

  return {
    isOwner,
    isLoading,
  };
}
