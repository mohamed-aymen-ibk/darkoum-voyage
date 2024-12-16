import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private readonly LOGIN_REDIRECT_URL = '/auth/login';

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.isAuthenticated();
    }

    private isAuthenticated(): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        } else {
            this.router.navigate([this.LOGIN_REDIRECT_URL]);
            return false;
        }
    }
}
