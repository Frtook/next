"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function getEmailServer() {
  const superbase = createServerComponentClient({ cookies });
  const { data } = await superbase.auth.getSession();
  return data.session?.user.email;
}
