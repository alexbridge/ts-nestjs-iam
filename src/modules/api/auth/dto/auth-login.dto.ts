import { UserDto } from '@modules/domain/user/dto/user.dto';
import { IsNotBlank } from '@modules/libs/validation/decorators/custom-validators';
import { IsString, MaxLength } from 'class-validator';

export class ApiAuthLoginRequest {
  @IsString()
  @IsNotBlank()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotBlank()
  @MaxLength(255)
  password: string;
}

export interface ApiAuthLoginResponse extends UserDto {
  token: string;
  tokenExpirationInstant?: number;
}
