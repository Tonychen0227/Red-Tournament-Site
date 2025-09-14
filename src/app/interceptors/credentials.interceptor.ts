import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const credentialsInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // Get the backend base URL without /api
  const backendBaseUrl = environment.apiUrl.replace('/api', '');
  
  // For requests to your backend domain, ensure credentials are included
  if (req.url.startsWith(backendBaseUrl)) {
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