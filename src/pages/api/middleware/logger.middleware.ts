import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const { statusCode } = res;

    const logMessage = `[${new Date().toLocaleString()}] ${ip} ${method} ${originalUrl} ${statusCode}\n`;

    fs.appendFile('logs.txt', logMessage, (err) => {
      if (err) {
        console.error('Failed to log request:', err);
      }
    });

    next();
  }
}
