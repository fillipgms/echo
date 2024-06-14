import { headers } from "next/headers";
import { Svix } from "svix";

export async function POST(request: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        return new Response(`No webhook`, { status: 300 });
    }

    const payload = await request.json();
    const header = headers();

    if (payload && header) {
        console.log("payload", payload);
        console.log("header", payload);
    }

    const heads = {
        "svix-id": header.get("svix-id"),
        "svix-timestamp": header.get("svix-timestamp"),
        "svix-signature": header.get("svix-signature"),
    };

    return new Response(`Received payload: ${payload}`, { status: 200 });
}
