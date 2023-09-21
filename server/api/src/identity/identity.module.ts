import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { DIDPublishingModule } from 'src/did-publishing/did-publishing.module';
import { DIDModule } from 'src/did/did.module';
import { KeyRingModule } from 'src/key-ring/key-ring.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityResolver } from './identity.resolver';
import { IdentityService } from './identity.service';
import { ActivityModule } from "../activity/activity.module";

@Module({
  providers: [
    IdentityResolver,
    IdentityService,
  ],
  imports: [
    PrismaModule,
    forwardRef(() => CredentialsModule),
    KeyRingModule,
    DIDModule,
    DIDPublishingModule,
    AuthModule,
    ActivityModule,
  ],
  exports: [
    IdentityService
  ]
})
export class IdentityModule { }
