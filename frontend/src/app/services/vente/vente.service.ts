import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {VenteDtoRequest, VenteDtoResponse} from "../../models/vente.dtos";


@Injectable({
    providedIn: 'root',
})
export class VenteService {
    private apiUrl = 'http://localhost:8080/api/sales';

    constructor(private http: HttpClient) { }

    getVentes(page?:number, size?:number): Observable<any> {
        let params = new HttpParams();
        if(page !== undefined){
            params = params.set('page', page.toString())
        }
        if(size !== undefined){
            params = params.set('size', size.toString())
        }
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.get<any>(this.apiUrl, { params, headers });
    }

    addVente(vente: VenteDtoRequest): Observable<VenteDtoResponse> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<VenteDtoResponse>(this.apiUrl, vente, { headers });
    }

    updateVente(id: number, vente: any): Observable<VenteDtoResponse> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put<VenteDtoResponse>(`${this.apiUrl}/${id}`, vente, { headers });
    }

    deleteVente(id: number): Observable<void> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}