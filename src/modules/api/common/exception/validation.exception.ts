import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  errors: any;

  constructor(errors: any) {
    super('Validation error', HttpStatus.BAD_REQUEST);
    this.errors = errors;
  }
}
