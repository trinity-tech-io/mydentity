import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DIDModule } from 'src/did/did.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityModule } from "../activity/activity.module";
import { BrowsersModule } from "../browsers/browsers.module";
import { CommonEmailingModule } from "../emailing/emailing.module";
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [
    UserResolver,
    UserService,
  ],
  imports: [
    PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CommonEmailingModule),
    forwardRef(() => DIDModule),
    forwardRef(() => KeyRingModule),
    forwardRef(() => ActivityModule),
    forwardRef(() => BrowsersModule),
  ],
  exports: [
    UserResolver,
    UserService
  ],
})
export class UserModule { }
