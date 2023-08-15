import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppException } from './app-exception';

/**
 * Catch app exceptions and convert them into http exceptions
 */
@Injectable()
export class AppExceptionGraphQLInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(exception => {
          if (exception instanceof AppException) {
            throw new HttpException({
              source: "api",
              timestamp: new Date().toISOString(),
              statusCode: exception.httpCode,
              message: exception.message
            }, exception.httpCode)
          } else {
            return throwError(exception);
          }
        }),
      );
  }
}