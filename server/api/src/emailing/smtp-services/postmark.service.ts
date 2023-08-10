import { Injectable } from '@nestjs/common';
import { IcalAttachment } from 'nodemailer/lib/mailer';
import { ServerClient } from "postmark";
import { logger } from '../../logger';
import { ISmtpService } from '../ismtp.service';

@Injectable()
export class PostmarkService implements ISmtpService {
  private client: ServerClient;

  constructor() {
    try {
      this.client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
    }
    catch (e) {
      logger.warn("Postmark client initialization error", e);
    }
  }

  async sendEmail(sender: string, to: string[], subject: string, htmlContent: string, textContent: string, calendarEvent?: IcalAttachment): Promise<void> {
    logger.debug(`PostmarkService.sendEmail, ${sender}, ${to}, ${subject}`);

    if (calendarEvent && (typeof calendarEvent.filename !== 'string' || typeof calendarEvent.content !== 'string'))
      throw new Error('Postmark sendEmail: Unsupported calendarEvent values');

    try {
      await this.client.sendEmail({
        From: sender,
        To: to.join(", "),
        Subject: subject,
        TextBody: textContent,
        HtmlBody: htmlContent,
        ...(calendarEvent && {
          Attachments: [
            {
              Name: calendarEvent.filename || "invite.ics",
              ContentID: null,
              Content: Buffer.from(calendarEvent.content.toString().replace(/\r\n/g, '\n')).toString('base64'),
              ContentType: "text/calendar; charset=utf-8; method=" + calendarEvent.method
            }
          ]
        })
      });
    }
    catch (e) {
      logger.warn("Postmark send email error", e);
    }
  }
}