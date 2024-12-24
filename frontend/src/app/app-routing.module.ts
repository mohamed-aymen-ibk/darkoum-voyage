import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProviderComponent} from "./component/provider/provider.component";
import {ClientComponent} from "./component/client/client.component";
import {ArticleComponent} from "./component/article/article.component";
import {VenteComponent} from "./component/vente/vente.component";
import {LoginComponent} from "./component/auth/login/login.component";
import {RegisterComponent} from "./component/auth/register/register.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {AuthGuard} from "./component/auth/auth.guard";
import {PackComponent} from "./component/pack/pack.component";

const routes: Routes = [
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'provider', component: ProviderComponent, canActivate: [AuthGuard] },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard]},
    { path: 'articles', component: ArticleComponent, canActivate: [AuthGuard]},
    { path: 'pack', component: PackComponent, canActivate: [AuthGuard]},
    { path: 'vente', component: VenteComponent, canActivate: [AuthGuard]},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}