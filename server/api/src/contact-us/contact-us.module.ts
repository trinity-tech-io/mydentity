import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { CommonEmailingModule } from '../emailing/emailing.module';
import { ContactUsService } from "./contact-us.service";
import { ContactUsResolver } from "./contact-us.resolver";

@Module({
  providers: [
    ContactUsService,
    ContactUsResolver,
  ],
  imports: [
    forwardRef(() => CommonEmailingModule),
    forwardRef(() => UserModule)
  ],
  exports: [
    ContactUsService,
    ContactUsResolver,
  ]
})

export class ContactUsModule { }