import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DIDPublishingService } from './did-publishing.service';

@Module({
  providers: [
    DIDPublishingService,
  ],
  imports: [
    PrismaModule,
    AuthModule,
  ],
  exports: [
    DIDPublishingService
  ]
})
export class DIDPublishingModule { }
