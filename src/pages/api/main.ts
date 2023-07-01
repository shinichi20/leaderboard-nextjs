import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { Reflector } from '@nestjs/core';
import { LoggingInterceptor } from './common/logging.interceptor';
import { RateLimitInterceptor } from './rate-limit.interceptor';
import { RolesGuard } from './score/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new RateLimitInterceptor());
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}

bootstrap();
