import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import {LoginComponent} from "./component/auth/login/login.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];

bootstrapApplication(LoginComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ],
}).catch(err => console.error(err));
