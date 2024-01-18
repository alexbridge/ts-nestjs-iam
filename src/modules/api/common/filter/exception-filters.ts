import ClientResponse from '@fusionauth/typescript-client/build/src/ClientResponse';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const { name, message, errors, response: error } = exception as any;

    this.logger.warn(`${name}: ${message}`, errors);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: name,
      ...(error && { errors: error }),
      ...(errors && {
        errors: errors.map((error) => this.convertError(error)),
      }),
    });
  }

  private convertError(error: any) {
    if (error.children?.length) {
      return {
        property: error.property,
        children: error.children.map((child) => this.convertError(child)),
      };
    }

    return {
      property: error.property,
      errors: Object.keys(error.constraints),
    };
  }
}

@Catch(ClientResponse)
export class ClientResponseFilter implements ExceptionFilter {
  private readonly logger = new Logger('ClientResponse');
  catch(clientResponse: ClientResponse<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, exception } = clientResponse;

    response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: clientResponse.wasSuccessful,
      ...(exception && { errors: exception }),
    });
  }
}
