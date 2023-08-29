import { Injectable } from '@nestjs/common';
import * as request from 'request';

@Injectable()
export class MicrosoftProfileService {
  public async retrieveEmail(token: string): Promise<string> {
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
}
