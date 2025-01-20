import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function DELETE(req: NextRequest) {
  // Extract the id parameter from the URL
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is missing" },
      { status: 400 }
    );
  }

  const supabase = createServerComponentClient({ cookies });

  const { error } = await supabase.from("Tickets").delete().eq("id", id);

  return NextResponse.json({ error });
}
