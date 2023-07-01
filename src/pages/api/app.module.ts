import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ScoreModule } from './score/score.module';
import { LoggingInterceptor } from './common/logging.interceptor';
import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  imports: [ScoreModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
