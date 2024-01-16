import { User } from '@fusionauth/typescript-client';
import { Injectable } from '@nestjs/common';
import { FusionauthClient } from '../client/fusionauth-client';

@Injectable()
export class FusionAuthUsersApiService {
  constructor(private readonly fusionAuthClient: FusionauthClient) {}

  async findUser(email: string): Promise<User> {
    const {
      response: { users: [user] = [] },
    } = await this.fusionAuthClient.searchUsersByQuery({
      search: {
        queryString: email,
        numberOfResults: 1,
      },
    });
    return user;
  }
}
