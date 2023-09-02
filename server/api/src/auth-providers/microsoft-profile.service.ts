import {Injectable} from '@nestjs/common';
import * as request from 'request';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class MicrosoftProfileService {
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly redirect_url: string;

  constructor(private readonly configService: ConfigService) {
    this.client_id = configService.get<string>('MICROSOFT_CLIENT_ID');
    this.client_secret = configService.get<string>('MICROSOFT_CLIENT_SECRET');
    this.redirect_url = configService.get<string>('MICROSOFT_CALLBACK_URL');
  }

  private async fetchTokenByMsCode(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenOptions = {
        url: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
        method: 'POST',
        form: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          code,
          redirect_uri: this.redirect_url,
          grant_type: 'authorization_code'
        }
      };

      request(tokenOptions, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          const tokenData = JSON.parse(body);
          resolve(tokenData.access_token);
        } else {
          console.error('Error exchanging authorization code for access token:', error, response, body);
          reject(new Error('Can not get token by MS code.'));
        }
      });
    });
  }

  public async fetchEmailByMsToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const options = {
        url: 'https://graph.microsoft.com/v1.0/me',
        headers: headers,
      };

      request.get(options, (error, response, body) => {
        if (error) {
          console.error('[microsoft] Error fetching user data:', error);
          reject(error);
          return;
        }

        const data = JSON.parse(body);
        const email = data.mail;
        console.log('[microsoft] User Email:', email);
        resolve(email);
        return email;
      });
    });
  }

  public async fetchEmailByMsCode(code: string): Promise<string> {
    const token = await this.fetchTokenByMsCode(code);
    return this.fetchEmailByMsToken(token);
  }
}
