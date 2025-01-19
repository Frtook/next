import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
interface Params {
  id: string;
}
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  const id = params.id;

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from("Tickets").delete().eq("id", id);

  return NextResponse.json({ error });
}
