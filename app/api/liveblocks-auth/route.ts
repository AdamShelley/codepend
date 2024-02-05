import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_sKMqBUb6vOl3IhTmXsU7ITlRNcOnNfA-6iaX20N5yBKXolTvKPoF77YkZw0uhHk6",
});

export async function POST(request: Request) {
  const authorisation = await auth();
  const user = await currentUser();

  if (!authorisation || !user) {
    return new Response("Not authenticated", { status: 403 });
  }

  const { room } = await request.json();
  const gen = await convex.query(api.gen.get, { id: room });

  if (gen?.orgId !== authorisation.orgId) {
    return new Response("Not found", { status: 404 });
  }

  const userInfo = {
    name: user.firstName!,
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
