import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AuthGuard } from './component/auth/auth.guard';
import {ProviderComponent} from "./component/provider/provider.component";
import {ClientComponent} from "./component/client/client.component";
import {PackComponent} from "./component/pack/pack.component";
import {ArticleComponent} from "./component/article/article.component";
import {VenteComponent} from "./component/vente/vente.component";


export const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'provider', component: ProviderComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
    { path: 'pack', component: PackComponent, canActivate: [AuthGuard] },
    { path: 'article', component: ArticleComponent, canActivate: [AuthGuard] },
    { path: 'vente', component: VenteComponent, canActivate: [AuthGuard] },
];