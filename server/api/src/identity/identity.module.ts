import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityResolver } from './identity.resolver';
import { IdentityService } from './identity.service';

@Module({
  providers: [
    IdentityResolver,
    IdentityService
  ],
  imports: [
    PrismaModule,
    CredentialsModule,
    AuthModule
  ],
  exports: [
    IdentityService
  ]
})
export class IdentityModule { }
