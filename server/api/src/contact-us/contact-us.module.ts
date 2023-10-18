import { Module, forwardRef } from '@nestjs/common';
import { EmailingModule } from '../emailing/emailing.module';
import { UserModule } from '../user/user.module';
import { ContactUsResolver } from "./contact-us.resolver";
import { ContactUsService } from "./contact-us.service";

@Module({
  providers: [
    ContactUsService,
    ContactUsResolver,
  ],
  imports: [
    forwardRef(() => EmailingModule),
    forwardRef(() => UserModule)
  ],
  exports: [
    ContactUsService,
    ContactUsResolver,
  ]
})

export class ContactUsModule { }