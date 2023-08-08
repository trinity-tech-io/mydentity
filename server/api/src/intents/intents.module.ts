import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { IntentsResolver } from './intents.resolver';
import { IntentsService } from './intents.service';

@Module({
  providers: [
    IntentsResolver,
    IntentsService
  ],
  imports: [
    PrismaModule
  ]
})
export class IntentsModule { }
