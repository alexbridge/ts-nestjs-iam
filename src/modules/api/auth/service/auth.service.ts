import { LoginRequest, LoginResponse, User } from '@fusionauth/typescript-client';
import { FusionAuthUserApiService } from '@modules/clients/fusionauth/services/fusionauth-user.api.service';
import { UserUpsertService } from '@modules/domain/user/services/user-upsert.service';
import {
  Injectable,
  Logger,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiAuthLoginRequest, ApiAuthLoginResponse } from '../dto/auth-login.dto';
import { ApiUserRegisterRequest } from '../dto/auth-register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly fusionAuthUserService: FusionAuthUserApiService,
    private readonly userUpsertService: UserUpsertService,
  ) {}

  async login(loginRequest: ApiAuthLoginRequest): Promise<ApiAuthLoginResponse> {
    try {
      const loginResponse = await this.fusionAuthUserService.login(
        this.mapToLoginRequest(loginRequest),
      );

      const registration = this.fusionAuthUserService.getApplicationRegistration(
        loginResponse.user,
      );
      if (!this.fusionAuthUserService.isUserVerified(registration)) {
        throw new PreconditionFailedException(`User ${loginResponse.user.id} is not yet verified`);
      }

      const userResponse = await this.mapToLoginResponse(loginResponse);

      // Sync user from Fusionauth to DB
      this.userUpsertService.upsertUser(userResponse);

      return userResponse;
    } catch (err) {
      const { statusCode } = err;
      if (statusCode === 404) {
        throw new UnauthorizedException('User with provided E-mail not found');
      }
      throw err;
    }
  }

  async register(registerRequest: ApiUserRegisterRequest): Promise<void> {
    const registrationResponse = await this.fusionAuthUserService.createUser(
      await this.mapToCreateUser(registerRequest),
    );

    const verified = this.fusionAuthUserService.isUserVerified(registrationResponse.registration);
    this.logger.log(
      `User ${registrationResponse.user.id} is verified: ${verified} after registration`,
    );
  }

  private mapToLoginRequest(loginRequest: ApiAuthLoginRequest): LoginRequest {
    return {
      loginId: loginRequest.email,
      password: loginRequest.password,
    } as LoginRequest;
  }

  private async mapToCreateUser(data: ApiUserRegisterRequest): Promise<User> {
    const groupId = await this.fusionAuthUserService.getDefaultGroup();
    return {
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      ...(groupId && {
        memberships: [{ groupId }],
      }),
      preferredLanguages: [data.language],
      data: data.data,
    };
  }

  private async mapToLoginResponse(response: LoginResponse): Promise<ApiAuthLoginResponse> {
    return {
      token: response.token,
      email: response.user.email,
      userId: response.user.id,
      userName: response.user.username || response.user.fullName,
      roles: this.fusionAuthUserService.getRoles(response),
      data: response.user.data,
    } as ApiAuthLoginResponse;
  }
}
