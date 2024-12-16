import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import {FormsModule} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    imports: [
        FormsModule
    ],
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    email: string = '';
    password: string = '';

    constructor(private authService: AuthService, private router: Router) {}

    onRegister($event: SubmitEvent): void {
        this.authService.register(this.email, this.password).subscribe({
            next: (response) => {
                console.log(response);
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error(err);
            },
        });
    }
}
