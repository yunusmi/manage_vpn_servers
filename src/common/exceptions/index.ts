import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { status, json } = this.prepareException(exception);
    response.status(status).send(json);

    this.logger.error(
      `Route error: url: ${request.url}, status: ${
        exception['status'] || 500
      }, message: ${exception.message}`
    );
    if (exception.stack) this.logger.error(exception.stack);
  }

  prepareException(exc: any): { status: number; json: object } {
    const error =
      exc instanceof HttpException
        ? exc
        : new InternalServerErrorException(exc.message);

    const status = error.getStatus();
    const response = error.getResponse();
    const json = typeof response === 'string' ? { error: response } : response;

    return { status, json };
  }
}
