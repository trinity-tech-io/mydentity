import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailingDevController } from './emailing-dev.controller';
import { EmailingService } from './emailing.service';
import { PostmarkService } from './smtp-services/postmark.service';
import { ProtonMailService } from './smtp-services/protonmail.service';
import { SendinblueService } from './smtp-services/sendinblue.service';
import { Smtp4devService } from './smtp-services/smtp4dev.service';

@Module({
  exports: [
    EmailingService
  ],
  providers: [
    EmailingService,
    SendinblueService,
    Smtp4devService,
    ProtonMailService,
    PostmarkService,
  ],
  imports: [
    ConfigModule
  ],
  controllers: [
    EmailingDevController
  ]
})
export class CommonEmailingModule { }
