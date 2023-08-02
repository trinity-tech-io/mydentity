import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IdentityResolver } from './identity.resolver';
import { DIDService } from './identity.service';

@Module({
  providers: [
    IdentityResolver,
    DIDService
  ],
  imports: [
    PrismaModule
  ]
})
export class IdentityModule { }
