import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDtoRequest, ClientDtoResponse } from '../../models/client.dtos';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) { }

  getClients(name?: string, page?: number, size?: number): Observable<any> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    if (page !== undefined) {
      params = params.set('page', page.toString());
    }
    if (size !== undefined) {
      params = params.set('size', size.toString());
    }
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers, params });
  }

  getAllClients(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiUrl, { headers });
  }
  getAllClientNames(): Observable<string[]> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<string[]>(`${this.apiUrl}/names`,{ headers });
  }

  addClient(client: ClientDtoRequest): Observable<ClientDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Adding client:', client);
    return this.http.post<ClientDtoResponse>(this.apiUrl, client, { headers });
  }

  getClientById(id: number): Observable<ClientDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ClientDtoResponse>(`${this.apiUrl}/${id}`,{ headers });
  }

  updateClient(
      id: number,
      client: ClientDtoRequest
  ): Observable<ClientDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<ClientDtoResponse>(`${this.apiUrl}/${id}`, client, { headers });
  }

  deleteClient(id: number): Observable<void> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}