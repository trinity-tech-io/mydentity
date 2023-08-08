import { Module } from '@nestjs/common';
import { AuthProvidersController } from './auth-providers.controller';
import { AuthProvidersService } from './auth-providers.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MicrosoftStrategy } from './microsoft.strategy';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UserModule],
  controllers: [AuthProvidersController],
  providers: [AuthProvidersService, MicrosoftStrategy],
})
export class AuthProvidersModule {}
