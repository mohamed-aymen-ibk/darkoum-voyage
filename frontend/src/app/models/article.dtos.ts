export interface ArticleDtoRequest {
    codeArticle: string;
    designation: string;
    providerName: string;
    userId: number;
}

export interface ArticleDtoResponse {
    id: number;
    codeArticle: string;
    designation: string;
    providerName: string;

}