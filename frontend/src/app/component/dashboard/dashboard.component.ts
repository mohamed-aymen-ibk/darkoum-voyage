import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        RouterLink
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
