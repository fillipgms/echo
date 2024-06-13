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
}
