import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './component/auth/auth.guard';
import {ProviderComponent} from "./component/provider/provider.component";
import {ClientComponent} from "./component/client/client.component";


export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'provider', component: ProviderComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },

];
