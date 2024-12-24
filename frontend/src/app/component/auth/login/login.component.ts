import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import {LoginDtoResponse} from "../../../models/login.dtos";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onLogin(): void {
        if (this.loginForm.valid) {
            const { email, password } = this.loginForm.value;
            this.authService.login(email, password).subscribe({
                next: (response: LoginDtoResponse) => {
                    // Store token and user details
                    localStorage.setItem('authToken', response.token);
                    localStorage.setItem('user', JSON.stringify(response.userDetails));
                    this.router.navigate(['/dashboard']);
                },
                error: (err) => {
                    this.errorMessage = err.error?.message || 'Login failed. Please check your credentials.';
                    console.error('Login failed', err);
                }
            });
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }
}