/* eslint-disable camelcase */
// Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// Above article shows why we need webhooks i.e., to sync data to our backend

// Resource: https://docs.svix.com/receiving/verifying-payloads/why
// It's a good practice to verify webhooks. Above article shows why we should do it
import { Webhook, WebhookRequiredHeaders } from "svix";
import { headers } from "next/headers";

import { IncomingHttpHeaders } from "http";

import { NextResponse } from "next/server";
import { createOrUpdateUser, deleteUser } from "@/actions/user";

// Resource: https://clerk.com/docs/integration/webhooks#supported-events
// Above document lists the supported events
type EventType = "user.created" | "user.updated" | "user.deleted";

export const POST = async (request: Request) => {
    const payload = await request.json();
    const header = headers();

    const svix_id = header.get("svix-id");
    const svix_timestamp = header.get("svix-timestamp");
    const svix_signature = header.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

    let evt: any = {};

    try {
        evt = wh.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    const eventType = evt?.type;

    if (eventType === "user.created" || eventType === "user.updated") {
        const {
            id,
            first_name,
            last_name,
            image_url,
            email_addresses,
            username,
        } = evt?.data;

        try {
            await createOrUpdateUser(
                id,
                first_name,
                last_name,
                image_url,
                email_addresses,
                username
            );

            return new Response("User is created or updated", {
                status: 200,
            });
        } catch (err) {
            console.error("Error creating or updating user:", err);
            return new Response("Error occured", {
                status: 500,
            });
        }
    }

    if (eventType === "user.deleted") {
        try {
            const { id } = evt?.data;
            await deleteUser(id);

            return new Response("User is deleted", {
                status: 200,
            });
        } catch (err) {
            console.error("Error deleting user:", err);
            return new Response("Error occured", {
                status: 500,
            });
        }
    }
};
