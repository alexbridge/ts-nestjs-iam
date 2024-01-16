import { Module } from '@nestjs/common';
import { UserUpsertService } from './services/user-upsert.service';
import { DomainCommonModule } from '../common/common.module';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), DomainCommonModule],
  providers: [UserUpsertService],
  exports: [UserUpsertService],
})
export class DomainUserModule {}
