"use client";

import { FormEvent } from "react";
import AuthForm from "../AuthForm";

export default function Login() {
  const handleSubmit = async (
    e: FormEvent,
    email: string,
    password: string
  ) => {
    e.preventDefault();

    console.log("login", email, password);
  };

  return (
    <main>
      <h2 className="text-center">Login</h2>

      <AuthForm handleSubmit={handleSubmit} />
    </main>
  );
}
