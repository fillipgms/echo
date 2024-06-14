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
}
