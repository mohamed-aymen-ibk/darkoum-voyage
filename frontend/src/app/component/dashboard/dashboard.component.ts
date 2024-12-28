
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import {Router} from "@angular/router";
import {NavbarComponent} from "../shared/navbar/navbar.component";
import {FooterComponent} from "../shared/footer/footer.component";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    imports: [
        NavbarComponent,
        FooterComponent
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