export interface ProviderDtoRequest {
    name: string;
    email: string;
    phone: string;
    address: string;
    serviceType: string;
    codeProvider?: string;
    designation?: string;
    ice?: string;
    rc?: string;
    rib?: string;
}

export interface ProviderDtoResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    serviceType: string;
    codeProvider?: string;
    designation?: string;
    ice?: string;
    rc?: string;
    rib?: string;
    createdAt: Date;
}