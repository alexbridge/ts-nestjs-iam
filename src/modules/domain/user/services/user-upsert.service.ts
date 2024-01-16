import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserUpsertService {
  private readonly logger = new Logger(UserUpsertService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async upsertUser(user: UserDto): Promise<void> {
    const userDb = await this.userRepository.findOneBy({
      userId: user.userId,
    });
    if (!userDb) {
      this.logger.log(`Upsert user ${user.userId} to DB`);

      this.userRepository.save({
        userId: user.userId,
        fullName: user.userName,
      } as UserEntity);
    } else {
      this.userRepository.update(userDb.id, {
        fullName: user.userName,
      });
    }
  }
}
