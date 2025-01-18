export interface PackDtoRequest {
    packNumber: string;
    price: number;
    quantity: number;
    storable: boolean;
    articleNames?: string[];
    clientNames?: string[];
    providerNames?: string[];
}

export interface PackDtoResponse {
    id: number;
    packNumber: string;
    price: number;
    quantity: number;
    storable: boolean;
    articleNames?: string[];
    clientNames?: string[];
    providerNames?: string[];
    createdAt?: Date;
}