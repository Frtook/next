"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

export async function getArticle(id: string) {
  const superbase = await createServerComponentClient({ cookies });
  const { data } = await superbase
    .from("articles")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }
  return data;
}

export async function getTitleArticle(id: string) {
  const superbase = await createServerComponentClient({ cookies });
  const { data } = await superbase
    .from("articles")
    .select()
    .eq("id", id)
    .single();
  return data.title;
}

export async function getArticles() {
  const superbase = createServerComponentClient({ cookies });

  const { data, error } = await superbase.from("articles").select();
  if (error) {
    console.log(error.message);
  }

  return data || [];
}
