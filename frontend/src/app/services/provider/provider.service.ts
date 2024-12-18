import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private apiUrl = 'http://localhost:8080/api/providers';

  constructor(private http: HttpClient) { }

  // Get all providers
  getProviders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get provider by ID
  getProviderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a provider
  addProvider(provider: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, provider);
  }

  // Update a provider by ID
  updateProvider(id: number, provider: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, provider);
  }

  // Delete provider by ID
  deleteProvider(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
