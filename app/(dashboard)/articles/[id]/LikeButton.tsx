"use client";
import { getEmailClient } from "@/app/_services/user/userClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
export default function LikeButton({
  isLikes,
  likes,
  id,
}: {
  isLikes: boolean;
  likes: number;
  id: string;
}) {
  const [like, setLike] = useState(likes);
  const [isLike, setIsLike] = useState(isLikes);
  const handleLike = async () => {
    const emailClient = await getEmailClient();
    const subparbase = createClientComponentClient();
    const { data: article, error } = await subparbase
      .from("articles")
      .select("user_likes")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching article:", error);
      return;
    }

    const userLikes = article.user_likes || [];
    const userIndex = userLikes.indexOf(emailClient);

    if (userIndex !== -1) {
      // User already liked the article, remove the like
      setLike(like - 1);
      setIsLike(false);
      userLikes.splice(userIndex, 1);
      await subparbase
        .from("articles")
        .update({ like: like - 1, user_likes: userLikes })
        .eq("id", id);
    } else {
      // User has not liked the article, add the like
      setLike(like + 1);
      setIsLike(true);
      userLikes.push(emailClient);
      await subparbase
        .from("articles")
        .update({ like: like + 1, user_likes: userLikes })
        .eq("id", id);
    }
  };
  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col items-center">
        {isLike && <FaHeart onClick={handleLike} className="text-red-500" />}
        {!isLike && <FaHeart onClick={handleLike} />}
        <span>{like}</span>
      </div>
    </div>
  );
}
