import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaClientKnownRequestErrorFilter implements ExceptionFilter {
  public catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {

    if(exception.code == 'P2025') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      return response.status(404).json({ statusCode: 404, error: 'Not Found' });
    }

    throw(exception);
  }
}