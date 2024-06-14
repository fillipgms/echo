import { headers } from "next/headers";
import { Svix, Webhook } from "svix";

export async function POST(request: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        return new Response(`No webhook`, { status: 300 });
    }

    const payload = await request.json();
    const header = headers();

    if (payload && header) {
        console.log("payload", payload);
        console.log("header", header);
    }

    const heads = {
        "svix-id": header.get("svix-id"),
        "svix-timestamp": header.get("svix-timestamp"),
        "svix-signature": header.get("svix-signature"),
    };

    if (
        !heads["svix-id"] ||
        !heads["svix-signature"] ||
        !heads["svix-timestamp"]
    ) {
        console.log("não encontrei alguma coisa do svix");
        console.log("svix-id", heads["svix-id"]);
        console.log("svix-signature", heads["svix-signature"]);
        console.log("svix-timestamp", heads["svix-timestamp"]);
    } else {
        console.log("todos os ids recebidos");
        console.log("svix-id", heads["svix-id"]);
        console.log("svix-signature", heads["svix-signature"]);
        console.log("svix-timestamp", heads["svix-timestamp"]);
    }

    let evnt;

    const wh = new Webhook(WEBHOOK_SECRET);

    console.log("WEBHOOK IS:", wh);

    return new Response(`tudo certo até agora`, { status: 200 });
}
