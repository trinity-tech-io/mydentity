import { Module } from '@nestjs/common';
import { DIDModule } from 'src/did/did.module';
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
  ],
  exports: [
    IdentityRootService
  ]
})
export class IdentityRootModule { }
