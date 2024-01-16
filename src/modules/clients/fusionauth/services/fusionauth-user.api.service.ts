import {
  LoginRequest,
  LoginResponse,
  RegistrationResponse,
  User,
  UserRegistration,
} from '@fusionauth/typescript-client';
import { Injectable, Logger } from '@nestjs/common';
import { FusionauthClient } from '../client/fusionauth-client';

@Injectable()
export class FusionAuthUserApiService {
  private readonly logger = new Logger(FusionAuthUserApiService.name);

  constructor(private readonly fusionAuthClient: FusionauthClient) {}

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const { response } = await this.fusionAuthClient.login({
      applicationId: this.fusionAuthClient.applicationId,
      ...loginRequest,
    });
    return response;
  }

  async createUser(user: User): Promise<RegistrationResponse> {
    const { response } = await this.fusionAuthClient.register(null, {
      registration: {
        applicationId: this.fusionAuthClient.applicationId,
        preferredLanguages: user.preferredLanguages,
      },
      user,
    });
    return response;
  }

  public getRoles(loginResponse: LoginResponse): string[] {
    // Own roles for application
    const roles =
      loginResponse.user.registrations?.find(
        (registration) => registration.applicationId === this.fusionAuthClient.applicationId,
      )?.roles || [];

    this.logger.log(`User: ${loginResponse.user.id} application roles ${roles}`);

    if (!roles.length) {
      this.logger.warn(
        `User: ${loginResponse.user.id} has no roles for application ${this.fusionAuthClient.applicationId}`,
      );
    }
    return roles;
  }

  getApplicationRegistration(user: User): UserRegistration {
    const registration = user.registrations?.find(
      (registration) => registration.applicationId === this.fusionAuthClient.applicationId,
    );

    this.logger.log(`User: ${user.id} application verified: ${registration.verified}`);

    return registration;
  }

  isUserVerified(registration: UserRegistration): boolean {
    return registration.verified;
  }

  async getDefaultGroup(): Promise<string> {
    const {
      response: { groups = [] },
    } = await this.fusionAuthClient.retrieveGroups();

    const groupId = groups.find((group) => group.data?.default)?.id;
    if (!groupId) {
      this.logger.warn('Default group not found for user registration');
    }
    return groupId;
  }
}
