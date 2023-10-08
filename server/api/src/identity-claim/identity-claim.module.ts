import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IdentityModule } from 'src/identity/identity.module';
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
    IdentityModule
  ]
})
export class IdentityClaimModule { }
