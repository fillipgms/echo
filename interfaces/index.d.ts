namespace models {
    interface EmailAdress {
        email_address: string;
        id: string;
        linked_to: Array;
        object: string;
        verification: Verification | null;
    }

    interface Verification {
        status: string;
        strategy: string;
    }

    interface User {
        _id: string;
        clerkId: string;
        firstName: string;
        lastName: string;
        userName: string;
        email: string;
        profilePicture: string;
        friends: User[];
        friendsRequest: User[];
        Blocked: User[];
        createdAt: Date;
    }

    interface FriendRequest {
        fromUserId: User[];
        toUserId: User[];
        status: string;
    }

    interface Message {
        _id: string;
        sender: User;
        receiver: User;
        content: string;
        timestamp: Date;
    }

    interface Conversation {
        _id: string;
        participants: User[];
        messages: Message[];
        lastMessage: string;
        updatedAt: Date;
    }
}
