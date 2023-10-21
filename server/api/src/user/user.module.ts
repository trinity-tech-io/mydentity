import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DIDModule } from 'src/did/did.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TemporaryAuthModule } from 'src/temporary-auth/temporary-auth.module';
import { ActivityModule } from "../activity/activity.module";
import { BrowsersModule } from "../browsers/browsers.module";
import { EmailingModule } from "../emailing/emailing.module";
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserEmailWsGateway } from "./user-email.ws.gateway";
import { CommonWsModule } from "../websockets/ws.module";

@Module({
  providers: [
    UserResolver,
    UserService,
    UserEmailWsGateway
  ],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => EmailingModule),
    forwardRef(() => DIDModule),
    forwardRef(() => KeyRingModule),
    forwardRef(() => ActivityModule),
    forwardRef(() => BrowsersModule),
    forwardRef(() => TemporaryAuthModule),
    forwardRef(() => CommonWsModule),
  ],
  exports: [
    UserResolver,
    UserService
  ],
})
export class UserModule { }
