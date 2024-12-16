import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister(event: Event): void {
    event.preventDefault();
    this.authService.register(this.email, this.password).subscribe({
      next: (response) => {
        alert('Registration successful');
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        console.error('Registration failed', err);
      }
    });
  }
}
