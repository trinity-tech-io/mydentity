import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
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
    forwardRef(() => KeyRingModule),
  ],
  exports: [
    UserResolver,
    UserService
  ],
})
export class UserModule { }
