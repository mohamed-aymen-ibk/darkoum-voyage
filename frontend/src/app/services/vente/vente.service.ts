import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VenteService {
    private apiUrl = 'http://localhost:8080/api/sales';

    constructor(private http: HttpClient) {}

    getVentes(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    addVente(vente: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, vente);
    }

    updateVente(id: number, vente: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, vente);
    }

    deleteVente(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}