"use client";

import { useTransition } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { deleteArticle } from "../actions";

export default function DeleteButton({ id }: { id: string }) {
  const [isPandding, startTranstioin] = useTransition();

  return (
    <button
      className="btn-primary"
      disabled={isPandding}
      onClick={() => startTranstioin(() => deleteArticle(id))}
    >
      {isPandding && (
        <>
          <AiOutlineDelete />
          <span className="text-white">Deletint ...</span>
        </>
      )}
      {!isPandding && (
        <>
          <AiOutlineDelete />
          <span className="text-white">Delete</span>
        </>
      )}
    </button>
  );
}
