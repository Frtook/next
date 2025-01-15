"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [error, setError] = useState("");
  const route = useRouter();

  const handleSubmit = async (
    e: FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/api/auth/callback` },
    });
    if (error) {
      setError(error.message);
    }
    if (!error) {
      route.push("/verify");
    }
  };

  return (
    <main>
      <h2 className="text-center">Sign up</h2>

      <AuthForm handleSubmit={handleSubmit} />
      {error && <span className="error">{error}</span>}
    </main>
  );
}
