"use server";

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addTiket = async (formData: FormData) => {
  const ticket = Object.fromEntries(formData);
  console.log(ticket, "GG");
  const subparbase = createServerActionClient({ cookies });
  const {
    data: { session },
  } = await subparbase.auth.getSession();

  const { error } = await subparbase
    .from("Tickets")
    .insert({ ...ticket, user_email: session?.user.email });

  if (error) {
    throw Error("Could not add the new ticket.");
  }
  revalidatePath("/");
  redirect("/tickets");
};

export const deleteTiket = async (id: string) => {
  const subparbase = createServerActionClient({ cookies });

  const { error } = await subparbase.from("Tickets").delete().eq("id", id);

  if (error) throw new Error("Could not delete the ticket.");

  revalidatePath("/tickets");
  redirect("/tickets");
};
