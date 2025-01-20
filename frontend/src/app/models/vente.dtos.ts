export interface VenteDtoRequest {
    clientId: number[];
    packId: number[];
    saleNumber: string;
    quantity: number;
    price: number;
    factured: boolean;
}

export interface VenteDtoResponse {
    id: number;
    clientName: string;
    clientNames: string[];
    packNumber: string;
    quantity: number;
    createdAt: Date;
    saleNumber: string;
    providerNames?: string[];
    description?: string;
    price?: number;
    packNumbers?: string[];
    clientId?:number[],
    packId?:number[],
    factured: boolean;
}