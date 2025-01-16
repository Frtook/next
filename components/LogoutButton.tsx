"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    const supberbase = createClientComponentClient();
    const { error } = await supberbase.auth.signOut();
    if (error) console.log(error);
    if (!error) router.push("/login");
  };
  return (
    <button onClick={handleClick} className="btn-primary">
      Logout
    </button>
  );
}
