import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { IdentityModule } from 'src/identity/identity.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
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
    forwardRef(() => IdentityModule),
    forwardRef(() => CredentialsModule),
    KeyRingModule,
    UserModule
  ],
  exports: [
    IdentityClaimService
  ]
})
export class IdentityClaimModule { }
