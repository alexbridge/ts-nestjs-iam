import { UserDto } from '@modules/domain/user/dto/user.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('FUSIONAUTH_SECRET'),
    });
  }

  async validate(payload: any): Promise<UserDto> {
    return {
      userId: payload.sub,
      email: payload.email,
      userName: payload.preferred_username,
      roles: payload.roles,
      data: payload.data,
    };
  }
}
