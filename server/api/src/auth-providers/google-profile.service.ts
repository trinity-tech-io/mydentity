import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import * as request from 'request';
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { SocksProxyAgent } from 'socks-proxy-agent';

/**
 * https://developers.google.com/identity/protocols/oauth2
 */
@Injectable()
export class GoogleProfileService {
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly redirect_url: string;
  private readonly proxies: any;
  private readonly agent: any;

  constructor(private readonly configService: ConfigService) {
    this.client_id = configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
    this.client_secret = configService.getOrThrow<string>('GOOGLE_SECRET');
    this.redirect_url = configService.getOrThrow<string>('GOOGLE_CALLBACK_URL');

    // TODO: Try http or socks proxy when can not access Google on local.
    // this.proxies = {
    //   'http': 'http://127.0.0.1:7890',
    //   'https': 'http://127.0.0.1:7890',
    // }

    const socks_proxy_url = configService.get<string>('SOCKS_PROXY');
    if (socks_proxy_url)
      this.agent = new SocksProxyAgent(socks_proxy_url);
  }

  private async fetchTokenByCode(code: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const tokenOptions = {
        url: 'https://oauth2.googleapis.com/token',
        method: 'POST',
        form: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          code,
          redirect_uri: this.redirect_url,
          grant_type: 'authorization_code'
        }
      };

      if (this.proxies)
        tokenOptions['proxies'] = this.proxies;

      if (this.agent)
        tokenOptions['agent'] = this.agent;

      request(tokenOptions, (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          const tokenData = JSON.parse(body);
          resolve(tokenData.access_token);
        } else {
          logger.error('google', 'Error exchanging Google authorization code for access token:', error, response, body);
          reject(new Error('Can not get token by Google code.'));
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
        url: 'https://www.googleapis.com/oauth2/v2/userinfo',
        headers: headers,
      };

      if (this.proxies)
        options['proxies'] = this.proxies;

      if (this.agent)
        options['agent'] = this.agent;

      request.get(options, (error, response, body) => {
        if (error) {
          logger.error('google', 'Error fetching user email by token:', error);
          reject(error);
          return;
        }

        console.log('google', `user info: ${body}`);

        let email = null;
        try {
          const data = JSON.parse(body);
          email = data.email;
          console.log('google', `user email: ${email}`);
        } catch (e) {
          logger.error('google', 'Exception fetching user email:', e);
        }

        resolve(email);
        return email;
      });
    });
  }

  public async getEmailAddressByCode(code: string): Promise<string> {
    if (!code || code === '') {
      throw new AppException(AuthExceptionCode.AuthError, `MUST provide Google code.`, 401);
    }

    let email = null;
    try {
      const token = await this.fetchTokenByCode(code);
      email = await this.fetchEmailByToken(token);
    } catch (e) {
      throw new AppException(AuthExceptionCode.AuthError, `Can not get email by Google code with exception.`, 401);
    }

    if (!email) {
      throw new AppException(AuthExceptionCode.AuthError, `Can not get email by Google code.`, 401);
    }

    return email;
  }
}
