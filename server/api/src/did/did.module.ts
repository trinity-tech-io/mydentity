import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CredentialsModule } from 'src/credentials/credentials.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DidService } from '../did/did.service';

@Module({
  providers: [
    DidService
  ],
  imports: [
    PrismaModule,
    CredentialsModule,
    AuthModule
  ],
  exports: [
    DidService
  ]
})
export class DIDModule { }
