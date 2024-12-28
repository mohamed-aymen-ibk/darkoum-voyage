import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VenteService {
    private apiUrl = 'http://localhost:8080/api/sales';

    constructor(private http: HttpClient) {}

    getVentes(page?:number, size?:number): Observable<any> {
        let params = new HttpParams();
        if(page !== undefined){
            params = params.set('page', page.toString())
        }
        if(size !== undefined){
            params = params.set('size', size.toString())
        }
        return this.http.get<any>(this.apiUrl, {params});
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