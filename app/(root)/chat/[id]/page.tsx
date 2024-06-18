interface FriendChatProps {
    params: {
        id: string;
    };
}

export default function FriendChat({ params: { id } }: FriendChatProps) {
    return (
        <section className="py-4 p-6 space-y-4">
            <nav>
                <h1>{id}</h1>
            </nav>
        </section>
    );
}
