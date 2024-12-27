export interface ClientDtoRequest {
    name: string;
    cin: string;
    email: string;
    phoneNumber: string;
    address: string;
    userId: number;
}

export interface ClientDtoResponse {
    id: number;
    cin: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}