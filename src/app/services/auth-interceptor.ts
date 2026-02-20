import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
//using functional interceptor rather than class interceptor
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAccessToken();

  if (!authToken) {
    return next(req);
  }

  // Clone the request to add the authentication header with Bearer token
  const newReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  return next(newReq);
}

