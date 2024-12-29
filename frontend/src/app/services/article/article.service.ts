import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ArticleDtoRequest, ArticleDtoResponse } from '../../models/article.dtos';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiUrl = 'http://localhost:8080/api/articles';

    constructor(private http: HttpClient) { }

    getArticles(name?: string, page?: number, size?: number): Observable<any> {
        const token = localStorage.getItem('authToken');
        let params = new HttpParams();
        if (name) {
            params = params.set('name', name)
        }
        if (page !== undefined) {
            params = params.set('page', page.toString())
        }
        if (size !== undefined) {
            params = params.set('size', size.toString())
        }
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.apiUrl, { headers, params });
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
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}