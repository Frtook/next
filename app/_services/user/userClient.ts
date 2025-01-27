"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getEmailClient() {
  const superbase = createClientComponentClient();
  const { data } = await superbase.auth.getSession();
  return data.session?.user.email;
}
