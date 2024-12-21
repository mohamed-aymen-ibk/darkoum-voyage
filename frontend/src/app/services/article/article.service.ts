import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = 'http://localhost:8080/api/articles';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addArticle(article: any): Observable<any> {
    return this.http.post(this.apiUrl, article);
  }

  updateArticle(id: number, article: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, article);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
