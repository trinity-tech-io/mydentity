import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DIDPublishingResolver } from './did-publishing.resolver';
import { DIDPublishingService } from './did-publishing.service';

@Module({
  providers: [
    DIDPublishingService,
    DIDPublishingResolver
  ],
  imports: [
    PrismaModule,
    AuthModule,
  ],
  exports: [
    DIDPublishingService,
  ]
})
export class DIDPublishingModule { }
