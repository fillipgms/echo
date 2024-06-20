import User from "@/components/User";
import { getAllFriends } from "@/lib/actions/user";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { IoChatbubbles } from "react-icons/io5";

export default async function EveryonePage() {
    const user = await currentUser();

    if (!user) return;

    const allFriends = (await getAllFriends(user.id)) as models.User[];

    return (
        <div className="p-4 space-y-3">
            <div>
                <h2 className="text-sm font-semibold  text-slate-800">
                    All Friends - {allFriends.length}
                </h2>
            </div>

            <div>
                {allFriends &&
                    allFriends.map((friend) => (
                        <Link
                            href={`/chat/${friend.userName}`}
                            key={friend._id}
                            className="border-t border-slate-300 hover:bg-slate-100 flex justify-between items-center py-3 px-3"
                        >
                            <User user={friend} className="cursor-pointer" />

                            <div>
                                <div className="size-8 rounded-full bg-slate-500 hover:bg-slate-700 text-slate-100 flex items-center justify-center">
                                    <IoChatbubbles size={"1.25rem"} />
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
