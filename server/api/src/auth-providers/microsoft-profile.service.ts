import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as request from 'request';
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";

@Injectable()
export class MicrosoftProfileService {
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly redirect_url: string;

  constructor(private readonly configService: ConfigService) {
    this.client_id = configService.getOrThrow<string>('MICROSOFT_CLIENT_ID');
    this.client_secret = configService.getOrThrow<string>('MICROSOFT_CLIENT_SECRET');
    this.redirect_url = configService.getOrThrow<string>('MICROSOFT_CALLBACK_URL');
  }

  private async fetchTokenByCode(code: string): Promise<string> {
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
          console.error('microsoft', 'Error exchanging authorization code for access token:', error, response, body);
          reject(new Error('Can not get token by Microsoft code.'));
        }
      });
    });
  }

  private async fetchEmailByToken(token: string): Promise<string> {
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
          console.error('microsoft', 'Error fetching user email data:', error);
          reject(error);
          return;
        }

        const data = JSON.parse(body);
        const email = data.mail;

        resolve(email);
        return email;
      });
    });
  }

  public async getEmailAddressByCode(code: string) {
    if (!code || code === '') {
      throw new AppException(AuthExceptionCode.AuthError, `MUST provide Microsoft code.`, 401);
    }

    let email = null;
    try {
      const token = await this.fetchTokenByCode(code);
      email = await this.fetchEmailByToken(token);
    } catch (e) {
      throw new AppException(AuthExceptionCode.AuthError, `Can not get email by Microsoft code with exception.`, 401);
    }

    if (!email) {
      throw new AppException(AuthExceptionCode.AuthError, `Can not get email by Microsoft code.`, 401);
    }

    return email;
  }
}
