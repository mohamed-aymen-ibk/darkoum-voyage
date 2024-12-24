export interface ClientDtoRequest {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    userId: number;
}

export interface ClientDtoResponse {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
}