import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

//componets
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const superbase = createServerComponentClient({ cookies });
  const { data } = await superbase.auth.getSession();

  if (!data.session) {
    redirect("/login");
  }
  return (
    <>
      <Navbar user={data.session.user} />
      {children}
    </>
  );
}
