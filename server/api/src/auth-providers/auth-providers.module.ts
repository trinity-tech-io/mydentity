import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthProvidersController } from './auth-providers.controller';
import { AuthProvidersService } from './auth-providers.service';
import { MicrosoftStrategy } from './microsoft.strategy';

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
    MicrosoftStrategy
  ],
})
export class AuthProvidersModule { }
