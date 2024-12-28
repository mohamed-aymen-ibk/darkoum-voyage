import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ProviderDtoRequest, ProviderDtoResponse} from "../../models/provider.dto";

@Injectable({
    providedIn: 'root'
})
export class ProviderService {
    private apiUrl = 'http://localhost:8080/api/providers';

    constructor(private http: HttpClient) {}

    getProviders(name?:string, page?:number, size?:number): Observable<any> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        let params = new HttpParams();
        if(name){
            params = params.set('name', name)
        }
        if(page !== undefined){
            params = params.set('page', page.toString())
        }
        if(size !== undefined){
            params = params.set('size', size.toString())
        }
        return this.http.get<any>(this.apiUrl, { headers, params });
    }

    addProvider(provider: ProviderDtoRequest): Observable<ProviderDtoResponse> {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        console.log('Adding provider:', provider);
        return this.http.post<ProviderDtoResponse>(`${this.apiUrl}`, provider, { headers });
    }


    updateProvider(id: number, provider: ProviderDtoRequest): Observable<ProviderDtoResponse> {
        return this.http.put<ProviderDtoResponse>(`${this.apiUrl}/${id}`, provider);
    }

    deleteProvider(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}