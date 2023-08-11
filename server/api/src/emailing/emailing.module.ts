import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailingDevController } from './emailing-dev.controller';
import { EmailingService } from './emailing.service';
import { Smtp4devService } from './smtp-services/smtp4dev.service';

@Module({
  exports: [
    EmailingService
  ],
  providers: [
    EmailingService,
    Smtp4devService,
  ],
  imports: [
    ConfigModule
  ],
  controllers: [
    EmailingDevController
  ]
})
export class CommonEmailingModule { }
