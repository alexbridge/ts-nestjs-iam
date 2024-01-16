import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ClientResponseFilter, HttpExceptionFilter } from './filter/exception-filters';

dotenv.config();

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ClientResponseFilter,
    },
  ],
})
export class ApiCommonModule {}
