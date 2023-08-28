import {forwardRef, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthProvidersController } from './auth-providers.controller';
import { AuthProvidersService } from './auth-providers.service';
import { MicrosoftStrategy } from './microsoft.strategy';
import { MicrosoftProfileService } from "../user/microsoft-profile.service";
import { UserService } from "../user/user.service";
import {EmailingService} from "../emailing/emailing.service";
import {Smtp4devService} from "../emailing/smtp-services/smtp4dev.service";
import {AuthService} from "../auth/auth.service";
import {KeyRingService} from "../key-ring/key-ring.service";
import {JwtModule, JwtService} from "@nestjs/jwt";

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
    AuthProvidersService,
    MicrosoftStrategy,
    MicrosoftProfileService,
    UserService,
    EmailingService,
    Smtp4devService,
    AuthService,
    KeyRingService,
  ],
})
export class AuthProvidersModule { }
