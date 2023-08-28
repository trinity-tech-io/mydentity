import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    AuthModule,
    UserModule
  ],
  controllers: [AuthProvidersController],
  providers: [
    AuthProvidersService,
    MicrosoftStrategy,
    MicrosoftProfileService,
    UserService,
    EmailingService,
    Smtp4devService
  ],
})
export class AuthProvidersModule { }
