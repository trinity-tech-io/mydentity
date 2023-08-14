import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DevicesResolver } from './devices.resolver';
import { DevicesService } from './devices.service';

@Module({
  providers: [
    DevicesResolver,
    DevicesService
  ],
  imports: [
    PrismaModule
  ],
  exports: [
    DevicesService
  ]
})
export class DevicesModule { }
