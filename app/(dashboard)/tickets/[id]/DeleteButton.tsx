"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

export default function DeleteButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    setIsLoading(true);

    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();
    console.log("GGGGGGGGG", json.error);
    if (json.error) {
      setIsLoading(false);
      console.log(json.error);
    }
    if (!json.error) {
      router.refresh();
      router.push("/tickets");
    }
  };
  return (
    <button className="btn-primary" disabled={isLoading} onClick={handleClick}>
      {isLoading && (
        <>
          <AiOutlineDelete />
          <span className="text-white">Deletint ...</span>
        </>
      )}
      {!isLoading && (
        <>
          <AiOutlineDelete />
          <span className="text-white">Delete</span>
        </>
      )}
    </button>
  );
}
