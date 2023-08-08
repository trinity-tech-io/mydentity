import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { InternalOAuthError, TokenError } from 'passport-oauth2';
import { logger } from '../logger';

/**
 * Global filter to exchange auth 500 error to 401.
 *
 * https://docs.nestjs.com/exception-filters
 */
@Catch(InternalOAuthError, TokenError)
export class AuthErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = 401;

    logger.error(`AuthErrorFilter: ${error}`);

    response.status(status).json({
      statusCode: status,
      cause: error.name,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
