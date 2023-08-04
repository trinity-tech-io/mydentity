import { Module } from '@nestjs/common';
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
    CredentialsModule
  ]
})
export class IdentityModule { }
