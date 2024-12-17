import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogin(): void {
        this.authService.login(this.email, this.password).subscribe({
            next: (response) => {
                console.log(response);
                localStorage.setItem('token', response.token);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error('Login failed', err);
            }
        });
    }
}