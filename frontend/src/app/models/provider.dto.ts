export interface ProviderDtoRequest {
    name: string;
    email: string;
    phone: string;
    address?:string;
    serviceType?:string;
}

export interface ProviderDtoResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    serviceType: string;
    createdAt: Date;
}