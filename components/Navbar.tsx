import Link from "next/link";
import Image from "next/image";
import Logo from "../public/vercel.svg";
import { User } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: { user: User | undefined }) {
  return (
    <nav className="flex flex-col md:flex-row">
      <Link href="/">
        <Image src={Logo} alt="Vercel Blog logo" width={50} quality={100} />
      </Link>
      <h1>Vercel Blog</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/articles" className="md:mr-auto">
        Articles
      </Link>
      <LogoutButton />
      {user && <span>Hello, {user.email}</span>}
    </nav>
  );
}
