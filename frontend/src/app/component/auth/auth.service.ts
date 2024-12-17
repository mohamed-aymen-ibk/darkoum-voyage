import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/authentication';

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email, password };
    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}