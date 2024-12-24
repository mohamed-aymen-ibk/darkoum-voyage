import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDtoRequest, ClientDtoResponse } from '../../models/client.dtos';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/api/clients';

  constructor(private http: HttpClient) {}

  getClients(): Observable<ClientDtoResponse[]> {
    return this.http.get<ClientDtoResponse[]>(this.apiUrl);
  }

  addClient(client: ClientDtoRequest): Observable<ClientDtoResponse> {
    return this.http.post<ClientDtoResponse>(this.apiUrl, client);
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