export interface VenteDtoRequest {
    clientId: number;
    packId: number;
    saleNumber: string;
    quantity: number;

}

export interface VenteDtoResponse {
    id: number;
    clientName: string;
    packNumber: string;
    quantity: number;
    createdAt: Date;
    saleNumber: string;
    articleNames?: string[];
    providerNames?: string[];
    description?: string;

}