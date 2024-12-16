import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    imports: [
        FormsModule,
        HttpClientModule,
    ],
    standalone: true,
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onLogin(): void {
        this.authService.login(this.email, this.password).subscribe({
            next: (response) => {
                console.log(response);
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                console.error(err);
            },
        });
    }
}
