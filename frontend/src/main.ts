import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import {HTTP_INTERCEPTORS, provideHttpClient} from '@angular/common/http';
import {AppComponent} from "./app/app.component";
import {routes} from "./app/app.routes";
import {AuthInterceptor} from "./app/interceptors/auth.interceptor";

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ]
}).catch(err => console.error(err));