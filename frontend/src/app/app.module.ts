import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import {HttpClientModule, provideHttpClient} from '@angular/common/http';
import { LoginComponent } from './component/auth/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {ProviderComponent} from "./component/provider/provider.component";
import {AppComponent} from "./app.component";
import {AppRoutingProvider} from "./component/provider/app-routing.provider";
import {FormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";

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

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingProvider,
        AppComponent,
        ProviderComponent,
    ],
    providers: [],
    bootstrap: [],
})
export class AppModule {}
