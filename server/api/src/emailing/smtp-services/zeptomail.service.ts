import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { IcalAttachment } from 'nodemailer/lib/mailer';
import { ISmtpService } from '../ismtp.service';

@Injectable()
export class ZeptoMailService implements ISmtpService {
  private transporter: Transporter;

  constructor(configService: ConfigService) {
    const host = configService.get("ZEPTOMAIL_HOST");
    const port = configService.get("ZEPTOMAIL_PORT");
    const user = configService.get("ZEPTOMAIL_USER");
    const pass = configService.get("ZEPTOMAIL_PASS");

    this.transporter = createTransport({
      host,
      port,
      //secure: true, // true for 465, false for other ports
      auth: {
        user,
        pass
      },
      logger: true,
      debug: true
    });
  }

  async sendEmail(from: string, to: string[], subject, htmlContent: string, textContent: string, calendarEvent?: IcalAttachment): Promise<void> {
    console.log('ZeptoMailService is sending an email.');
    const info = await this.transporter.sendMail({
      from, to, subject,
      html: htmlContent,
      text: textContent,
      icalEvent: calendarEvent
      //text: "Hello world?", // plain text body
    });
  }
}