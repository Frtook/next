import { NextResponse } from "next/server";

interface Params {
  id: string;
}
export async function GET(_: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const res = await fetch("http://localhost:4000/tickets/" + id);
  if (!res.ok) {
    return NextResponse.json({ error: "connot find ticket" }, { status: 404 });
  }
  const ticket = await res.json();
  return NextResponse.json(ticket, { status: 200 });
}
