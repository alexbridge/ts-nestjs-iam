import { ClientsFusionauthModule } from '@modules/clients/fusionauth/fusionauth.module';
import { DomainUserModule } from '@modules/domain/user/user.module';
import { LibsValidationModule } from '@modules/libs/validation/validation.module';
import { Module } from '@nestjs/common';
import { ApiCommonModule } from '../common/common.module';
import { AuthController } from './controller/auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy';
import { RolesGuard } from './roles/roles.guard';
import { AuthService } from './service/auth.service';
import { UniqueEmailValidator } from './service/validation/unique-email.validator';

@Module({
  imports: [ApiCommonModule, ClientsFusionauthModule, LibsValidationModule, DomainUserModule],
  providers: [JwtStrategy, RolesGuard, AuthService, UniqueEmailValidator],
  exports: [JwtStrategy, RolesGuard, UniqueEmailValidator],
  controllers: [AuthController],
})
export class ApiAuthModule {}
