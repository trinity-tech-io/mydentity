import { Module, forwardRef } from '@nestjs/common';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { DIDModule } from 'src/did/did.module';
import { IdentityModule } from 'src/identity/identity.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityRootResolver } from './identity-root.resolver';
import { IdentityRootService } from './identity-root.service';

@Module({
  providers: [
    IdentityRootResolver,
    IdentityRootService
  ],
  imports: [
    PrismaModule,
    DIDModule,
    KeyRingModule,
    forwardRef(() => IdentityModule),
    forwardRef(() => CredentialsModule),
  ],
  exports: [
    IdentityRootService
  ]
})
export class IdentityRootModule { }
