import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from "./component/shared/navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
        <router-outlet></router-outlet>
        <app-navbar></app-navbar>`,
    styleUrls: ['./app.component.css']
})
export class AppComponent {}