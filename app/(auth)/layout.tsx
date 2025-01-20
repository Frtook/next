import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const superbase = createServerComponentClient({ cookies });
  const { data } = await superbase.auth.getSession();

  if (data.session) redirect("/");
  return (
    <>
      <nav className="flex p-4 ">
        <h1 className="mr-auto md:mr-0">Dojo Helpdesk</h1>
        <Link href="/signup">Sign up</Link>
        <Link href="/login">Login</Link>
      </nav>
      {children}
    </>
  );
}
