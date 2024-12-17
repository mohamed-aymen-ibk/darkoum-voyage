import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { FooterComponent } from './component/shared/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent, FooterComponent],
    template: `
        <app-navbar></app-navbar>
        <div class="min-h-screen bg-gray-100">
            <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
    `,
    styleUrls: ['./app.component.css'],
})
export class AppComponent {}
