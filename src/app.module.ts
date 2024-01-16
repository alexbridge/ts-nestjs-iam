import configService from '@db/ormconfig.service';
import { ApiModules } from '@modules/api/api.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), ConfigModule, ApiModules],
})
export class AppModule {}
