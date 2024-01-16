import { FusionAuthClient as OriginalFusionAuthClient } from '@fusionauth/typescript-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FusionauthClient extends OriginalFusionAuthClient {
  readonly applicationId: string;

  constructor(private readonly config: ConfigService) {
    super(
      config.getOrThrow<string>('FUSIONAUTH_API_KEY'),
      config.getOrThrow<string>('FUSIONAUTH_BASE_PATH'),
    );
    this.applicationId = config.getOrThrow<string>('FUSIONAUTH_APP_ID');
  }
}
