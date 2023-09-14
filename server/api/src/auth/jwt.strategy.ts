import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';

type JWTPayload = {
  sub: string;
  browserKey: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JWTPayload) {
    // Fetch authenticated user object based on access token user id.
    // JWT signature validity has been checked earlier by passport-jwt
    const user = await this.prisma.user.findFirst({ where: { id: payload.sub } });
    if (!user)
      throw new AppException(AuthExceptionCode.InexistingUser, "User not found for the current access token", 401);

    if (!payload.browserKey)
      throw new AppException(AuthExceptionCode.WrongAccessToken, "browserKey not found in access token. Sign in again and retry.", 403);

    // Remember last access from this browser
    const browser = await this.prisma.browser.findFirst({ where: { userId: user.id, key: payload.browserKey } });
    if (browser) {
      this.prisma.browser.update({
        where: { id: browser.id },
        data: {
          lastUsedAt: new Date()
        }
      });
    }

    return {
      user,
      browser
    };
  }
}
