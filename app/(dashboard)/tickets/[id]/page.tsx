import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";
interface Params {
  id: string;
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;

  const superbase = await createServerComponentClient({ cookies });
  const { data: ticket } = await superbase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  return {
    title: `Dojo Helpdesk | ${ticket?.title || "not found ticket"}`,
  };
}

async function getTicket(id: string) {
  const superbase = await createServerComponentClient({ cookies });
  const { data } = await superbase
    .from("Tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }
  return data;
}

export default async function TicketDetails({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const ticket = await getTicket(id);
  const superbase = createServerComponentClient({ cookies });
  const { data } = await superbase.auth.getSession();

  return (
    <main>
      <nav>
        <h2 className="mr-auto">Ticket Details</h2>
        {data.session?.user.email === ticket.user_email && (
          <DeleteButton id={ticket.id} />
        )}
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
