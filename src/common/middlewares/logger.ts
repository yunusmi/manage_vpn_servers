import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    const id = uuidv4();
    this.logger.debug('Incoming request', {
      id,
      method: request.method,
      endpoint: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
      ip: request.ip,
      userId: request.user?.id,
    });
    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        this.logger.debug('Request processed', {
          id,
          time: Date.now() - now,
        });
      })
    );
  }
}
