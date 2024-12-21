import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
    selector: 'app-footer',
    imports: [
        RouterLink
    ],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {
    constructor(private authService: AuthService, private router: Router) {}

}

