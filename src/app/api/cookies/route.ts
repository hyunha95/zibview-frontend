import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  if (!cookieStore.has("anonymousUserUUID")) {
    (await cookies()).set("anonymousUserUUID", uuidv4(), {
      httpOnly: false,
    });
  }

  return new Response(null, {
    status: 200,
    headers: { "Set-Cookie": "anonymousUserUUID=" + uuidv4() + "; HttpOnly" },
  });
}
