import { UserDto } from '@modules/domain/user/dto/user.dto';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): UserDto => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
