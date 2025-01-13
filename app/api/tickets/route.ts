import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();

  return NextResponse.json(tickets, { status: 200 });
}

export async function POST(req: NextRequest) {
  const ticket = await req.json();

  const res = await fetch("http://localhost:4000/tickets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });

  const newTickt = await res.json();
  return NextResponse.json(newTickt, { status: 201 });
}