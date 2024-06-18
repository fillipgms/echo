interface FriendChatProps {
    params: {
        id: string;
    };
}

export default function FriendChat({ params: { id } }: FriendChatProps) {
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}
