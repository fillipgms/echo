import { headers } from "next/headers";
import { Svix } from "svix";

export async function POST(req: Request) {
    const reqString = JSON.stringify(req);

    return new Response(`Received req: ${reqString}`, { status: 200 });
}
