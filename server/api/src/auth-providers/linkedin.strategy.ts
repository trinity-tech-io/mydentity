import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { SocksProxyAgent } from 'socks-proxy-agent';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {

  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.getOrThrow<string>('LINKEDIN_CLIENT_ID'),
      clientSecret: configService.getOrThrow<string>('LINKEDIN_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow<string>('LINKEDIN_CALLBACK_URL'),
      scope: ['r_emailaddress', 'r_liteprofile'],
    });

    // proxy to get token from google apis server.
    const proxy = configService.get<string>('SOCKS_PROXY');
    if (proxy) {
      // const agent = new HttpsProxyAgent('http://127.0.0.1:4780');
      const agent = new SocksProxyAgent(proxy);
      this['_oauth2'].setAgent(agent);
    }
  }

  private getUserByProfile(profile: any, accessToken: string) {
    const { name, emails, photos } = profile
    return {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: (photos && photos.length > 0) ? photos[0].value : null,
      accessToken
    }
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done): Promise<any> {
    done(null, this.getUserByProfile(profile, accessToken));
  }
}