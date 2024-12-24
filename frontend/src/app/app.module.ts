import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {ProviderComponent} from "./component/provider/provider.component";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {ClientComponent} from "./component/client/client.component";
import {PackComponent} from "./component/pack/pack.component";
import {ArticleComponent} from "./component/article/article.component";
import {VenteComponent} from "./component/vente/vente.component";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        ProviderComponent,
        ClientComponent,
        PackComponent,
        ArticleComponent,
        VenteComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}