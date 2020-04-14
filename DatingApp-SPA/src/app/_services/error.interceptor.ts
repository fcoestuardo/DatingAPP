import { Injectable, INJECTOR } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(error => {
            if (error.status === 401){
                return throwError(error.stausText);
            }
            if (error instanceof HttpErrorResponse){
                const aplicationError = error.headers.get('Aplcation-Error');
                if (aplicationError){
                    return throwError(aplicationError);
                }
                const serverError = error.error;
                let modalStateErrors = '';
                if(serverError.errors && typeof serverError.errors === 'object'){
                    for (const key in serverError){
                        if (serverError.errors[key]){
                            modalStateErrors += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateErrors || serverError || 'Server Error');
            }
        })
    )
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};