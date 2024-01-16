import { Module } from '@nestjs/common';
import { ApiAuthModule } from './auth/auth.module';
import { ApiUserModule } from './user/user.module';

@Module({
  imports: [ApiAuthModule, ApiUserModule],
  exports: [ApiAuthModule, ApiUserModule],
})
export class ApiModules {}
