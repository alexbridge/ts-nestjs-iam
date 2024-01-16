import { Module } from '@nestjs/common';
import { ApiAuthModule } from '../auth/auth.module';
import { ApiCommonModule } from '../common/common.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [ApiCommonModule, ApiAuthModule],
  controllers: [UserController],
})
export class ApiUserModule {}
