import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CredentialsResolver } from './credentials.resolver';
import { CredentialsService } from './credentials.service';

@Module({
  providers: [
    CredentialsResolver,
    CredentialsService
  ],
  imports: [
    PrismaModule
  ],
  exports: [
    CredentialsService
  ]
})
export class CredentialsModule { }
