import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { UserType } from '@prisma/client';
import { Strategy, VerifyCallback } from 'passport-microsoft';
import {ThirdPartyUser} from "../user/dto/third-party-user";

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('MICROSOFT_CLIENT_ID'),
      clientSecret: configService.get<string>('MICROSOFT_CLIENT_SECRET'),
      callbackURL: configService.get<string>('MICROSOFT_CALLBACK_URL'),
      scope: ['user.read'],
      tenant: 'common',
      authorizationURL:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    });
  }

  /**
   * Return server side profile from microsoft profile.
   * @param profile microsoft side profile
   * @param accessToken access token for microsoft api
   * @private server side user profile.
   */
  private getUserByProfile(profile: any, accessToken: string): ThirdPartyUser {
    const { name, emails, photos } = profile;
    return {
      userType: UserType.MICROSOFT,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: null,
      accessToken,
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(`microsoft validate:`, profile);
    done(null, this.getUserByProfile(profile, accessToken));
  }
}
