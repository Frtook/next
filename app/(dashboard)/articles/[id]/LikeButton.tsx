"use client";
import { getEmailClient } from "@/app/_services/user/userClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();

  const handleLike = () => {
    // Optimistically update UI
    const newLikes = isLike ? like - 1 : like + 1;
    const newIsLike = !isLike;

    setLike(newLikes);
    setIsLike(newIsLike);

    // Transition logic for database update
    startTransition(async () => {
      try {
        const emailClient = await getEmailClient();
        const supabase = createClientComponentClient();

        const { data: article, error } = await supabase
          .from("articles")
          .select("user_likes")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching article:", error);
          throw new Error("Failed to fetch article data.");
        }

        const userLikes = article.user_likes || [];
        const userIndex = userLikes.indexOf(emailClient);

        if (userIndex !== -1) {
          // Remove the like
          userLikes.splice(userIndex, 1);
          await supabase
            .from("articles")
            .update({ like: newLikes, user_likes: userLikes })
            .eq("id", id);
        } else {
          // Add the like
          userLikes.push(emailClient);
          await supabase
            .from("articles")
            .update({ like: newLikes, user_likes: userLikes })
            .eq("id", id);
        }
      } catch (err) {
        console.error("Error updating likes:", err);
        // Rollback UI on failure
        setLike(isLike ? like + 1 : like - 1);
        setIsLike(isLike);
      }
    });
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex flex-col items-center">
        <FaHeart
          onClick={handleLike}
          className={`${
            isLike ? "text-red-500" : "text-gray-500"
          } cursor-pointer`}
        />
        <span>{isPending ? "..." : like}</span>
      </div>
    </div>
  );
}
