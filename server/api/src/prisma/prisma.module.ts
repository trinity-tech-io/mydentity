import { Module } from '@nestjs/common';
import { DIDPrismaService } from './did.prisma.service';
import { PrismaService } from './prisma.service';

@Module({
  providers: [
    PrismaService,
    DIDPrismaService
  ],
  exports: [
    PrismaService,
    DIDPrismaService
  ],
})
export class PrismaModule { }