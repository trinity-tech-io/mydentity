import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from '../auth/currentuser.decorator';
import { EmailTemplateType } from './email-template-type';
import { EmailingService } from './emailing.service';
// import { MinutesTemplateData } from '../meeting-minutes/meeting-minutes.service';

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
      case EmailTemplateType.MEETING_INVITATION:
        return {
          invitingUserName: "Benjamin",
          userName: "John",
          meetingName: "Initial meeting",
          projectName: "The cool project",
          lobbyUrl: "somewhere"
        }
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
      // case EmailTemplateType.MEETING_MINUTES:
        // const minutesData: MinutesTemplateData = {
        //   user: { avatar: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png", name: "Bob" },
        //   schedule: { date: "January 16th", time: "3:30pm" },
        //   meeting: { title: "Super Meeting", url: "somewhere" },
        //   host: { name: "Benjamin" },
        //   project: { banner: "https://www.shutterstock.com/image-vector/flat-design-concepts-business-strategy-260nw-223511938.jpg", name: "Cool project" },
        //   attendees: { intro: "Bob, Manuella and Jenifer." },
        //   links: [{ url: "https://mylink.com" }],
        //   documents: [{ name: "Cool PDF" }, { name: "Great picture" }],
        //   pictures: [{ name: "A picture", thumbnail: "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-512.png" }],
        //   topics: ["Introduction", "Budget planning", "Conclusion"],
        //   tasks: [
        //     { title: "Clean up the room", assignee: { name: "Ben" } }
        //   ]
        // };
        // return minutesData;
      case EmailTemplateType.CALENDAR_UPDATED:
        return {
          date: "Wednesday 15th, 2023",
          link: "somewhere",
          name: "Cool meeting",
          project: { name: "Super project" },
          guests: [
            { name: "Benjamin", email: "benjamin@email.com", isOrganizer: true }
          ]
        }
      default:
        return {};
    }
  }
}