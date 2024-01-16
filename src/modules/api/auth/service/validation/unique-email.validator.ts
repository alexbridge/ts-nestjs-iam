import { FusionAuthUsersApiService } from '@modules/clients/fusionauth/services/fusionauth-users.api.service';
import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private readonly usersService: FusionAuthUsersApiService) {}

  async validate(email: string) {
    const user = await this.usersService.findUser(email);
    return !user;
  }
}
