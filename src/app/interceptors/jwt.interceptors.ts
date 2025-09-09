import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JwtInterceptors {
  static withToken: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
    return next(req);
  };
}
