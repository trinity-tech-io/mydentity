import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthProvidersController } from './auth-providers.controller';
import { AuthProviderResolver } from "./auth-providers.resolver";
import { MicrosoftProfileService } from './microsoft-profile.service';
import { MicrosoftStrategy } from './microsoft.strategy';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '10 days' },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    forwardRef(() => AuthModule),
    UserModule,
  ],
  controllers: [AuthProvidersController],
  providers: [
    MicrosoftStrategy,
    MicrosoftProfileService,
    AuthProviderResolver
  ],
})
export class AuthProvidersModule { }
