import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    // Verifique se o WEBHOOK_SECRET está definido
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("WEBHOOK_SECRET não está definido");
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
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

    // Se não houver cabeçalhos, retornar erro
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error("Faltando cabeçalhos svix");
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Obtenha o corpo da requisição
    const payload = await req.json();
    const body = JSON.stringify(payload);
    console.log("Payload recebido:", body);

    // Crie uma nova instância do Svix com o seu segredo
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verifique o payload com os cabeçalhos
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
        console.log("Payload verificado com sucesso:", evt);
    } catch (err) {
        console.error("Erro ao verificar webhook:", err);
        return new Response("Error occured", {
            status: 400,
        });
    }

    // Processar o payload
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Webhook com ID de ${id} e tipo ${eventType}`);
    console.log("Corpo do webhook:", body);

    return new Response("", { status: 200 });
}
