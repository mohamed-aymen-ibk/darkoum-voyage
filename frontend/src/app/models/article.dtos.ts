export interface ArticleDtoRequest {
    codeArticle: string;
    designation: string;
    userId: number;
}

export interface ArticleDtoResponse {
    id: number;
    codeArticle: string;
    designation: string;
}