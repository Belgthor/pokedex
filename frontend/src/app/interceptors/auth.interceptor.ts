import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.loadToken();
  console.log('authInterceptor: ' + token)
  console.log(req)
  if(token){
    const authReq = req.clone({
        // setHeaders: {
        //     'Content-Type' : 'application/json; charset=utf-8',
        //     'Accept'       : 'application/json',
        //     'Authorization': `Bearer ${token}`
        // }
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    console.log(authReq)

    return next(authReq);
  }
  // else {
    // router.navigate(['/auth/login']);
  // }
  return next(req);
};