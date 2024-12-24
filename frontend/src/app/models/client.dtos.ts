export interface ClientDtoRequest {
    name: string;
    email: string;
    phone: string;
    address:string;
}

export interface ClientDtoResponse {
    id: number;
    name: string;
    email: string;
    phone: string;
    address:string;
}