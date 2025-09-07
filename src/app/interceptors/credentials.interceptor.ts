import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const credentialsInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // For requests to your API, ensure credentials are included
  if (req.url.includes('/api/')) {
    const withCredentialsReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    return next(withCredentialsReq);
  }

  return next(req);
};