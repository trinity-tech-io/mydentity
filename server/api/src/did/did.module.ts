import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DidService } from '../did/did.service';
import { PrismaDIDStorage } from '../did/did.storage';

@Module({
  providers: [
    DidService,
    PrismaDIDStorage,
  ],
  imports: [
    PrismaModule,
    AuthModule
  ],
  exports: [
    DidService
  ]
})
export class DIDModule { }
