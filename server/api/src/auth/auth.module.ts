import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { BrowsersModule } from 'src/browsers/browsers.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10 days' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    PrismaModule,
    forwardRef(() => BrowsersModule)
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    AuthService
  ],
})
export class AuthModule { }
