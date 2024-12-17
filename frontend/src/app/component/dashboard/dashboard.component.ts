import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {NavbarComponent} from "../shared/navbar/navbar.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        NavbarComponent
    ],
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(private authService: AuthService, private router: Router) {}

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }
}
