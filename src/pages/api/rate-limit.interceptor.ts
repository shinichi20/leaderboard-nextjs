import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 60, // Per minute
});

@Injectable()
export class RateLimitInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const key = request.ip;

    try {
      await rateLimiter.consume(key);
    } catch (err) {
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    return next.handle().pipe(
      tap(() => {
        // Handle response
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}
