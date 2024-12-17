import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    registerForm: FormGroup;
    errorMessage: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
        });
    }

    onRegister(): void {
        if (this.registerForm.valid) {
            const registerData: RegisterRequest = this.registerForm.value;

            this.authService.register(registerData).subscribe({
                next: (response) => {
                    console.log('Registration successful', response);
                    this.router.navigate(['/auth/login']);
                },
                error: (err) => {
                    this.errorMessage = 'Registration failed. Please try again.';
                    console.error('Registration failed', err);
                }
            });
        } else {
            this.errorMessage = 'Please fill in all required fields correctly.';
        }
    }
}