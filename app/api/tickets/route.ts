import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(request: NextRequest) {
  const ticket = await request.json();
  console.log(ticket);
  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // insert the data
  const { data, error } = await supabase
    .from("articles")
    .insert({
      ...ticket,
      user_email: session?.user.email,
    })
    .select()
    .single();

  return NextResponse.json({ data, error });
}
