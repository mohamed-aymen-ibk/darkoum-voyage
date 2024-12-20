import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProviderComponent} from "./provider.component";

const routes: Routes = [
    { path: 'providers', component: ProviderComponent },
    { path: '', redirectTo: '/providers', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingProvider {}
