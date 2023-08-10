import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MicrosoftProfileService } from './microsoft-profile.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import {CommonEmailingModule} from "../emailing/emailing.module";

@Module({
  providers: [UserResolver, UserService, MicrosoftProfileService],
  imports: [PrismaModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CommonEmailingModule),
  ],
  exports: [UserResolver, UserService],
})
export class UserModule {}
