import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {LoginDtoResponse} from "../../models/login.dtos";

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}



@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/authentication';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<LoginDtoResponse> {
        const payload = { email, password };
        return this.http.post<LoginDtoResponse>(`${this.apiUrl}/login`, payload)
            .pipe(
                tap((response) => {
                    if (typeof window !== 'undefined' && window.localStorage) {
                        localStorage.setItem('authToken', response.token);
                        localStorage.setItem('user', JSON.stringify(response.userDetails));
                    }
                })
            );
    }

    register(registerData: RegisterRequest): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, registerData);
    }

    logout() {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    }

    isLoggedIn(): boolean {
        if (typeof window !== 'undefined' && window.localStorage) {
            return !!localStorage.getItem('authToken');
        }
        return false;
    }

    getCurrentUser() {
        if (typeof window !== 'undefined' && window.localStorage) {
            const userJson = localStorage.getItem('user');
            return userJson ? JSON.parse(userJson) : null;
        }
        return null;
    }

    isAgency(): boolean {
        const user = this.getCurrentUser();
        return user ? user.role === 'AGENCY' : false;
    }
}