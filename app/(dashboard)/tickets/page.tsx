import { Suspense } from "react";
import TicketList from "./TicketList";
import Loading from "../loading";
import Link from "next/link";

export const metadata = {
  title: "Dojo Helpdesk | Tickets",
};

export default function Tickets() {
  return (
    <main>
      <nav>
        <div className="flex justify-between w-full items-center">
          <div>
            <h2>Tickets</h2>
            <p>
              <small>Currently open tickets.</small>
            </p>
          </div>
          <Link className="btn-primary p-2 rounded-xl" href="tickets/create">
            Create
          </Link>
        </div>
      </nav>
      <Suspense fallback={<Loading />}>
        <TicketList />
      </Suspense>
    </main>
  );
}
