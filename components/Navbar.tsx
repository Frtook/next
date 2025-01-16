import Link from "next/link";
import Image from "next/image";
import Logo from "../public/dojo-logo.png";
import { User } from "@supabase/auth-helpers-nextjs";
import LogoutButton from "./LogoutButton";

export default function Navbar({ user }: { user: User | undefined }) {
  return (
    <nav>
      <Link href="/">
        <Image
          src={Logo}
          alt="Dojo Helpdesk logo"
          width={70}
          placeholder="blur"
          quality={100}
        />
      </Link>
      <h1>Dojo Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      <LogoutButton />
      {user && <span>Hello, {user.email}</span>}
    </nav>
  );
}
