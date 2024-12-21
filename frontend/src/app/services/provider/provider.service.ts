import {Injectable, Provider} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    private apiUrl = 'http://localhost:8080/api/providers';

    constructor(private http: HttpClient) {}

    getProviders(): Observable<Provider[]> {
        return this.http.get<Provider[]>(`${this.apiUrl}`);
    }

    addProvider(provider: { phone: string; name: string; email: string }): Observable<Provider> {
        return this.http.post<Provider>(`${this.apiUrl}/add`, provider);
    }

    updateProvider(provider: Provider, editProvider: any): Observable<Provider> {
        return this.http.put<Provider>(`${this.apiUrl}/update`, provider);
    }

    deleteProvider(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
    }
}
