import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MicrosoftProfileService } from './microsoft-profile.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService, MicrosoftProfileService],
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  exports: [UserResolver, UserService],
})
export class UserModule {}
