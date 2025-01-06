export interface Product {
    id: string;
    title: string;
    price: number;
    thumbnail: string;
}

export interface ProductList {
    results: Product[];
    paging: {
        total: number;
        offset: number;
        limit: number;
    }
}

export interface UserProfileProps {
    userProfileImg: string | null;
    userName: string | null;
    userId: string | null;
}

export interface Order {
    id: string;
    dateCreated: string;
    lastUpdated: string;
    expirationDate: string;
    dateClosed: string;
    status: string;
    totalAmount: number;
    buyer: {
        id: string;
        nickname: string;
        firstName: string;
        lastName: string;
    }
    payment: {
        id: string;
        status: string;
    }
}