import { Module } from '@nestjs/common';
import { DIDModule } from 'src/did/did.module';
import { IdentityModule } from 'src/identity/identity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CredentialsResolver } from './credentials.resolver';
import { CredentialsService } from './credentials.service';

@Module({
  providers: [
    CredentialsResolver,
    CredentialsService
  ],
  imports: [
    PrismaModule,
    DIDModule,
    IdentityModule
  ],
  exports: [
    CredentialsService
  ]
})
export class CredentialsModule { }
