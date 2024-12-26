import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  private apiUrl = 'http://localhost:8080/api/packs';

  constructor(private http: HttpClient) {}

  getPacks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPack(pack: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pack);
  }

  updatePack(id: number, pack: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, pack);
  }

  deletePack(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
  getArticleNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/articles/names`);
  }
}