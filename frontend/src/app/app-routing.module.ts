import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProviderComponent} from "./component/provider/provider.component";
import {ClientComponent} from "./component/client/client.component";
import {ArticleComponent} from "./component/article/article.component";
import {VenteComponent} from "./component/vente/vente.component";

const routes: Routes = [
    { path: '', redirectTo: '/providers', pathMatch: 'full' },
    { path: 'providers', component: ProviderComponent },
    { path: 'client', component: ClientComponent},
    { path: 'articles', component: ArticleComponent},
    { path: 'vente', component: VenteComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
