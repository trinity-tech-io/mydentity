import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client/main';
import { UserService } from '../user/user.service';
import { EmailingService } from "../emailing/emailing.service";
import { EmailTemplateType } from "../emailing/email-template-type";

@Injectable()
export class ContactUsService {
  constructor(private userService: UserService, private emailingService: EmailingService) { }

  async submitContactUs(message: string, user: User) {
    let email: string;
    const to = ["tech-accounts@didservice.io"];
    const userEmail = await this.userService.getUserEmail(user);
    if (userEmail) {
      email = userEmail.email;
      to.push(email);
    }

    console.log('contact-us', email);

    return this.emailingService.sendEmail(EmailTemplateType.CONTACT_US, "tech-accounts@didservice.io", to, "Contact Us", {
      ...(user && {
        user: {
          id: user.id,
          name: user.name,
          email
        }
      }),
      message
    });
  }
}