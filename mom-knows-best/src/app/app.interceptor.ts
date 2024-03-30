import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable, Provider } from '@angular/core';
  import { Observable, catchError } from 'rxjs';
  import { environment } from 'src/environments/environment';
  import { ErrorService } from './core/error/error.service';
  import { Router } from '@angular/router';
  
  const { apiUrl } = environment;
  
  @Injectable()
  export class AppInterceptor implements HttpInterceptor {
    API = '/api';
  
    constructor (private errorService: ErrorService, private router: Router) {}
    
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (req.url.startsWith('/api')) {
        req = req.clone({
          url: req.url.replace('/api', apiUrl),
          withCredentials: true,
        });
      }
  
      return next.handle(req).pipe(
        catchError((err) => {
  
          if(err.status === 401) {
            this.router.navigate(['/login'])
          } else {
            this.errorService.setError(err);
            this.router.navigate(['/error'])
          }
          return [err];
        })
      )
    }
  }
  
  export const appInterceptorProvider: Provider = {
    useClass: AppInterceptor,
    multi: true,
    provide: HTTP_INTERCEPTORS,
  };
  