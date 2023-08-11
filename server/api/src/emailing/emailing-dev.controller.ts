import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/currentuser.decorator';
import { EmailTemplateType } from './email-template-type';
import { EmailingService } from './emailing.service';

@Controller('emailingdev')
export class EmailingDevController {
  constructor(private emailingService: EmailingService) { }

  @Get('preview/:templateType')
  //@Header('Content-Type', 'application/json')
  //@Header('Content-Disposition', 'attachment; filename="package.json"')
  async downloadFile(@CurrentUser() user: User, @Param('templateType') templateTypeKey: EmailTemplateType) {
    const availableTypes = Object.keys(EmailTemplateType);
    if (!availableTypes.includes(templateTypeKey)) {
      return `Inexisting template type ${templateTypeKey}. Choose among ${availableTypes.join(", ")}.`;
    }

    const templateType = EmailTemplateType[templateTypeKey] as EmailTemplateType;
    return this.emailingService.templatify(templateType, this.getPlaceholderData(templateType), true)
  }

  private getPlaceholderData(templateType: EmailTemplateType) {
    console.log()
    switch (templateType) {
      case EmailTemplateType.WELCOME:
        return {
          user: {
            name: "Benjamin"
          },
          loungeUrl: "somewhere"
        }
      case EmailTemplateType.EMAIL_AUTHENTICATION:
        return {
          magicLink: "somewhere"
        }
      default:
        return {};
    }
  }
}