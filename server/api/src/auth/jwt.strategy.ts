import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

type JWTPayload = {
  sub: string;
  browserId: string;
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

    // Remember last access from this browser
    const browser = await this.prisma.browser.update({
      where: { userId: user.id, id: payload.browserId },
      data: {
        lastUsedAt: new Date()
      }
    })

    return {
      user,
      browser
    };
  }
}
