import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth-service';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
//using functional interceptor rather than class interceptor
export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAccessToken();
  // Clone the request to add the authentication header.
  if(!authToken){
return next(req)
  }
  const newReq = req.clone({
    // setHeaders({Authorization:})
    //  setHeaders: {
    //   Authorization: `Bearer ${authToken}`,
    // }
     headers: req.headers.append('X-Authentication-Token', authToken),
  });
  return next(newReq);
}

