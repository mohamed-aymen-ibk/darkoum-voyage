import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');
        const userId = localStorage.getItem('userId');

        let modifiedReq = req;

        // Add the token and userId to the headers if token exists
        if (token) {
            modifiedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    ...(userId ? { 'X-User-Id': userId } : {})
                }
            });
        }

        return next.handle(modifiedReq);
    }
}
