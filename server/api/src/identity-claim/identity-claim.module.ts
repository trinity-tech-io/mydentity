import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { IdentityModule } from 'src/identity/identity.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityClaimResolver } from './identity-claim.resolver';
import { IdentityClaimService } from './identity-claim.service';

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
    KeyRingModule
  ]
})
export class IdentityClaimModule { }
