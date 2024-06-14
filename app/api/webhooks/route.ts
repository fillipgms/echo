// /app/api/webhook/route.ts
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    console.log("Received POST request at /api/webhooks");

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("WEBHOOK_SECRET is not defined");
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Missing svix headers");
        return new Response("Error occurred -- no svix headers", {
            status: 400,
        });
    }

    console.log("Svix headers received:", {
        svix_id,
        svix_timestamp,
        svix_signature,
    });

    // Get the body
    let payload: any;
    try {
        payload = await req.json();
        console.log("Payload received:", payload);
    } catch (err) {
        console.error("Error parsing JSON body:", err);
        return new Response("Error parsing JSON body", {
            status: 400,
        });
    }
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
        console.log("Webhook verified successfully:", evt);
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occurred during webhook verification", {
            status: 400,
        });
    }

    if (evt.type === "user.created") {
        console.log("userId:", evt.data.id);
    }

    return new Response("Webhook processed successfully", { status: 200 });
}
