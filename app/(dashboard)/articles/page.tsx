import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";

export const metadata = {
  title: "Dojo Helpdesk | articles",
};

export default function Articles() {
  return (
    <main>
      <nav>
        <div className="flex justify-between w-full items-center">
          <div>
            <h2>Articles</h2>
            <p>
              <small>Currently open articles.</small>
            </p>
          </div>
          <Link className="btn-primary p-2 rounded-xl" href="articles/create">
            New Article
          </Link>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
