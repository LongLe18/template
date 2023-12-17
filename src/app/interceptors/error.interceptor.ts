import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { formatMessage } from "devextreme/localization";
import notify from 'devextreme/ui/notify';

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {
  formatMessage = formatMessage;

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('Lỗi xuất hiện:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    notify({
      message: formatMessage('request-error'),
      position: { at: 'top center', my: 'top center' }
    },
    'error');
    return throwError(() => new Error(formatMessage('request-error')));
  }
  
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      // .pipe(catchError((err) => throwError(() => err.error)));
      .pipe(catchError(this.handleError))
  }
}
