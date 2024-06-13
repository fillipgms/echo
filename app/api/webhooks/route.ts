import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("WEBHOOK_SECRET não está definido");
        return new Response("WEBHOOK_SECRET não está definido", {
            status: 500,
        });
    }

    // Obtenha os cabeçalhos
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    console.log("Cabeçalhos recebidos:", {
        svix_id,
        svix_timestamp,
        svix_signature,
    });

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Faltando cabeçalhos svix");
        return new Response("Faltando cabeçalhos svix", { status: 400 });
    }

    let payload;
    try {
        payload = await req.json();
    } catch (err) {
        console.error("Erro ao ler o payload:", err);
        return new Response("Erro ao ler o payload", { status: 400 });
    }

    const body = JSON.stringify(payload);
    console.log("Payload recebido:", body);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
        console.log("Payload verificado com sucesso:", evt);
    } catch (err) {
        console.error("Erro ao verificar webhook:", err);
        return new Response("Erro ao verificar webhook", { status: 400 });
    }

    // Processar o payload
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook com ID de ${id} e tipo ${eventType}`);
    console.log("Corpo do webhook:", body);

    return new Response("Webhook processado com sucesso", { status: 200 });
}
