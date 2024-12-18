import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../../component/auth/auth.service";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    private apiUrl = 'http://localhost:8080/api/providers';

    constructor(private http: HttpClient, private authService: AuthService) { }

    // Get all providers with error handling
    getProviders(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
            catchError(this.handleError)  // Catch errors and handle them
        );
    }

    getProviderById(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    addProvider(provider: any): Observable<any> {
        if (this.authService.isAgency()) {
            return this.http.post<any>(this.apiUrl, provider).pipe(
                catchError(this.handleError)
            );
        } else {
            throw new Error('You are not authorized to add providers');
        }
    }

    updateProvider(id: number, provider: any): Observable<any> {
        if (this.authService.isAgency()) {
            return this.http.put<any>(`${this.apiUrl}/${id}`, provider).pipe(
                catchError(this.handleError)
            );
        } else {
            throw new Error('You are not authorized to update providers');
        }
    }

    deleteProvider(id: number): Observable<void> {
        if (this.authService.isAgency()) {
            return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
                catchError(this.handleError)
            );
        } else {
            throw new Error('You are not authorized to delete providers');
        }
    }

    // Generic error handling method
    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
    }
}
