export interface ClientDtoRequest {
    name: string;
    cin: string;
    email: string;
    phoneNumber: string;
    address: string;
    userId: number;
    codeClient?: string;
    designation?: string;
    ice?: string;
    rc?: string;
    rib?: string;
}

export interface ClientDtoResponse {
    id: number;
    cin: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    codeClient?: string;
    designation?: string;
    ice?: string;
    rc?: string;
    rib?: string;
}