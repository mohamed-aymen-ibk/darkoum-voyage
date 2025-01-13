import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PackDtoRequest, PackDtoResponse } from '../../models/pack.dtos';

@Injectable({
  providedIn: 'root',
})
export class PackService {
  private apiUrl = 'http://localhost:8080/api/packs';

  constructor(private http: HttpClient) {}

  getPacks(packNumber?: string, page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (packNumber) {
      params = params.set('packNumber', packNumber);
    }
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size !== undefined) {
      params = params.set('size', size.toString());
    }
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { params, headers });
  }
  getAllPacks(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
  getAllPackNames(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`${this.apiUrl}/names`,{ headers });
  }

  addPack(pack: PackDtoRequest): Observable<PackDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<PackDtoResponse>(this.apiUrl, pack, { headers });
  }

  updatePack(id: number, pack: PackDtoRequest): Observable<PackDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<PackDtoResponse>(`${this.apiUrl}/${id}`, pack, { headers });
  }

  deletePack(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
  getArticleNames(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`${this.apiUrl}/articles/names`, { headers });
  }
  getAllProviderNames(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`http://localhost:8080/api/providers/names`, { headers });
  }
}