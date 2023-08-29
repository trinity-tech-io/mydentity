import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BrowsersService } from 'src/browsers/browsers.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { uuid } from 'uuidv4';
import { AuthTokens } from './model/auth-tokens';

@Injectable()
export class AuthService {
  private static readonly TOKEN_EXPIRES_IN = '30d'; //30 days

  constructor(
    //@Inject(forwardRef(() => UserService)) private usersService: UserService,
    private jwtTokenService: JwtService,
    private browsersService: BrowsersService
  ) { }

  /* async validateUser(email: string, password: string): Promise<any>   {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return user;
      }
    }
    return null;
  } */

  /**
   * Parse JWT token and return payload data.
   */
  getTokenPayload(token: string) {
    try {
      return this.jwtTokenService.verify(token) as any;
    } catch (ex) {
      throw new Error(`Invalid token: ${ex.message}`);
    }
  }

  public async generateUserCredentials(user: User, existingBrowserId?: string, userAgent?: string): Promise<AuthTokens> {
    const browserId = await this.browsersService.validateOrCreateBrowserId(user, userAgent, existingBrowserId);

    const payload = {
      sub: user.id,
      browserId
    };

    return {
      accessToken: this.jwtTokenService.sign(payload, {
        expiresIn: AuthService.TOKEN_EXPIRES_IN,
      }),
      refreshToken: this.jwtTokenService.sign(payload),
    };
  }

  async refreshAccessToken(user: UserEntity) {
    const payload = { sub: user.id, clientId: uuid() };

    return {
      accessToken: this.jwtTokenService.sign(payload, {
        expiresIn: AuthService.TOKEN_EXPIRES_IN,
      }),
    };
  }
}
