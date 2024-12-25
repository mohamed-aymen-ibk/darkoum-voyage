import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleDtoRequest, ArticleDtoResponse } from '../../models/article.dtos';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    private apiUrl = 'http://localhost:8080/api/articles';

    constructor(private http: HttpClient) {}

    getArticles(): Observable<ArticleDtoResponse[]> {
        return this.http.get<ArticleDtoResponse[]>(this.apiUrl);
    }

    addArticle(article: ArticleDtoRequest): Observable<ArticleDtoResponse> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<ArticleDtoResponse>(this.apiUrl, article, { headers });
    }

    updateArticle(id: number, article: ArticleDtoRequest): Observable<ArticleDtoResponse> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<ArticleDtoResponse>(`${this.apiUrl}/${id}`, article, { headers });
    }

    deleteArticle(id: number): Observable<void> {
        const token = localStorage.getItem('authToken'); // Récupérer le token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
