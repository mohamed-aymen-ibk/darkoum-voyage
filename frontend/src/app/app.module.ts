import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './component/auth/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {ProviderComponent} from "./component/provider/provider.component";

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'provider', component: ProviderComponent }
];

bootstrapApplication(LoginComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient()
    ],
}).catch(err => console.error(err));
