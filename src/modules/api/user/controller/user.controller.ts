import { JwtAuthGuard } from '@modules/api/auth/jwt/jwt-auth.guard';
import { User } from '@modules/api/common/decorator/user-param-decorator';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserDto } from '../../../domain/user/dto/user.dto';
import { UserEntity } from '../../../domain/user/entities/user.entity';
import { IdToEntityPipe } from '../../common/pipe/id-to-entity.pipe';

@Controller('/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get('/me')
  async me(@User() user: UserDto): Promise<UserDto> {
    return user;
  }

  @Get('/:id')
  async getOne(@Param('id', IdToEntityPipe) user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
