import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { IdentityModule } from 'src/identity/identity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityClaimResolver } from './identity-claim.resolver';
import { IdentityClaimService } from './identity-claim.service';
import { DIDModule } from 'src/did/did.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';

@Module({
  providers: [
    IdentityClaimResolver,
    IdentityClaimService
  ],
  imports: [
    ConfigModule,
    PrismaModule,
    IdentityModule,
    CredentialsModule,
    KeyRingModule,
    DIDModule
  ]
})
export class IdentityClaimModule { }
