import { IsNotBlank } from '@modules/libs/validation/decorators/custom-validators';
import { Optional } from '@nestjs/common';
import { IsEmail, IsIn, IsObject, IsString, MaxLength, Validate } from 'class-validator';
import { LANGUAGES as APP_LANGUAGES } from '../../../config/app/app-config';
import { UniqueEmailValidator } from '../service/validation/unique-email.validator';

export class ApiUserRegisterRequest {
  @IsString()
  @IsNotBlank()
  @MaxLength(255)
  fullName: string;

  @IsString()
  @IsNotBlank()
  @IsEmail()
  @MaxLength(255)
  @Validate(UniqueEmailValidator)
  email: string;

  @IsString()
  @IsNotBlank()
  @MaxLength(50)
  password: string;

  @IsString()
  @IsIn(APP_LANGUAGES)
  language: string;

  @Optional()
  @IsObject()
  data: object;
}
