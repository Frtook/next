import { notFound } from "next/navigation";
interface Params {
  id: string;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/tickets/${id}`);
  const ticket = await res.json();

  return {
    title: `Dojo Helpdesk | ${ticket.title}`,
  };
}

async function getTicket(id: string) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 60,
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function TicketDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
