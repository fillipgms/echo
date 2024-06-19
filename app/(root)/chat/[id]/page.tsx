import User from "@/components/User";
import { getUserByUsername } from "@/lib/actions/user";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

interface FriendChatProps {
    params: {
        id: string;
    };
}

export default async function FriendChat({ params: { id } }: FriendChatProps) {
    const conversationWith = (await getUserByUsername(id)) as models.User;

    if (!conversationWith) return;

    return (
        <section className="relative w-full h-full">
            <div className="px-5 py-3 bg-slate-100 rounded-t-md border-b-slate-300 border-b flex gap-3 items-center absolute top-0 w-full z-20">
                <Link href={"/"}>
                    <IoIosArrowBack />
                </Link>
                <User user={conversationWith} size="size-8" />
            </div>

            <div className="overflow-scroll max-h-[calc(100vh_-_2rem)] absolute bottom-0 w-full z-20 bg-slate-50 px-5 py-4">
                TEXT AREA
            </div>
        </section>
    );
}
