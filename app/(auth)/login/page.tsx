"use client";

import { FormEvent, useState } from "react";
import AuthForm from "../AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (
    e: FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    const superbase = createClientComponentClient();
    const { error } = await superbase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) setError(error.message);
    if (!error) router.push("/");
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>
      <AuthForm handleSubmit={handleSubmit} />
      {error && <span className="error">{error}</span>}
    </main>
  );
}
