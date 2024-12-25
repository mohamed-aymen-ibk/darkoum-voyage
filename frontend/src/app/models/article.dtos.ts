export interface ArticleDtoRequest {
    name: string;
    description:string;
    price: number;
    stock: number;
    providerName: string;
}


export interface ArticleDtoResponse {
    id: number;
    name: string;
    description:string;
    price: number;
    stock: number;
    providerName: string;
}