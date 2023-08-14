import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DidService } from '../did/did.service';
import { IdentityResolver } from './identity.resolver';
import { IdentityService } from './identity.service';

@Module({
  providers: [
    IdentityResolver,
    IdentityService,
    DidService
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
