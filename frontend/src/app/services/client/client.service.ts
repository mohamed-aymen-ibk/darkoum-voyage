import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDtoRequest, ClientDtoResponse } from '../../models/client.dtos';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  getClients(name?:string): Observable<ClientDtoResponse[]> {
    let params = new HttpParams();
    if(name){
      params = params.set('name', name)
    }
    return this.http.get<ClientDtoResponse[]>(this.apiUrl, { params });
  }

  addClient(client: ClientDtoRequest): Observable<ClientDtoResponse> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Adding provider:', client);
    return this.http.post<ClientDtoResponse>(this.apiUrl, client, { headers });
  }

  getClientById(id: number): Observable<ClientDtoResponse> {
    return this.http.get<ClientDtoResponse>(`${this.apiUrl}/${id}`);
  }

  updateClient(
      id: number,
      client: ClientDtoRequest
  ): Observable<ClientDtoResponse> {
    return this.http.put<ClientDtoResponse>(`${this.apiUrl}/${id}`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}