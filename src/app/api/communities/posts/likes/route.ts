import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createSupabaseClient } from "@/lib/auth/supabase/server";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
  if (!session) {
    throw "no user session";
  }

  // const {name, email} = session?.user
  // const supabase = createSupabaseClient();
  // const userData = await supabase.from('users').select('*').eq('name', name).eq('email', email)
  // if(userData.error){
  //   throw 'no user data'
  // }
  // const id =userData.data[0].id

  //supabase.schema("interactions").from("post_likes").insert();
  return new Response("testing");
}
