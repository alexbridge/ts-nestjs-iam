import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FusionauthClient } from './client/fusionauth-client';
import { FusionAuthUserApiService } from './services/fusionauth-user.api.service';
import { FusionAuthUsersApiService } from './services/fusionauth-users.api.service';

@Module({
  imports: [ConfigModule],
  providers: [FusionauthClient, FusionAuthUserApiService, FusionAuthUsersApiService],
  exports: [FusionAuthUserApiService, FusionAuthUsersApiService],
})
export class ClientsFusionauthModule {}
