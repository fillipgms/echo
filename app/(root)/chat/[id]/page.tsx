import ChatConversations from "@/components/ChatConversations";
import SendMessageInput from "@/components/SendMessageInput";
import User from "@/components/User";
import { getUserByClerkId, getUserByUsername } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface FriendChatProps {
    params: {
        id: string;
    };
}

export default async function FriendChat({ params: { id } }: FriendChatProps) {
    const user = await currentUser();

    if (!user) return;

    const loggedUser = (await getUserByClerkId(user.id)) as models.User;

    const conversationWith = (await getUserByUsername(id)) as models.User;

    if (!conversationWith) {
        return (
            <div className="flex items-center justify-center h-full">
                <h1>Usuário não encontrado</h1>
            </div>
        );
    }

    return (
        <section className="relative w-full h-full md:max-h-[calc(100svh_-_2rem)]">
            <div className="px-5 py-3 bg-slate-100 rounded-t-md border-b-slate-300 border-b flex gap-3 items-center absolute top-0 w-full z-20">
                <Link href={"/"}>
                    <IoIosArrowBack />
                </Link>
                <User user={conversationWith} size="size-8" />
            </div>

            <ChatConversations
                messageTo={conversationWith}
                loggedUser={loggedUser}
            />

            <div className="overflow-y-auto absolute bottom-0 w-full z-20 bg-slate-50 px-5 py-4 rounded-b-md">
                <SendMessageInput
                    messageTo={JSON.stringify(conversationWith)}
                    messageFrom={JSON.stringify(loggedUser)}
                />
            </div>
        </section>
    );
}
