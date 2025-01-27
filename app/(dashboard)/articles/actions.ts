"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addArticle = async (formData: FormData) => {
  const ticket = Object.fromEntries(formData);
  const subparbase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await subparbase.auth.getSession();

  const { error } = await subparbase
    .from("articles")
    .insert({ ...ticket, user_email: session?.user.email });

  if (error) {
    throw Error("Could not add the new ticket.");
  }
  revalidatePath("/");
  redirect("/articles");
};

export const deleteArticle = async (id: string) => {
  const subparbase = createServerActionClient({ cookies });

  const { error } = await subparbase.from("articles").delete().eq("id", id);

  if (error) throw new Error("Could not delete the ticket.");

  revalidatePath("/articles");
  redirect("/articles");
};
