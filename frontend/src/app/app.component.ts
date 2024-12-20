import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { FooterComponent } from './component/shared/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <div class="min-h-screen bg-gray-100">
            <router-outlet></router-outlet>
        </div>
    `,
    styleUrls: ['./app.component.css'],
})
export class AppComponent {}
