import { Injectable } from '@nestjs/common';
import { IcalAttachment } from 'nodemailer/lib/mailer';
import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from "sib-api-v3-typescript";
import { SendSmtpEmail } from 'sib-api-v3-typescript/model/sendSmtpEmail';
import { logger } from '../../logger';
import { ISmtpService } from '../ismtp.service';

@Injectable()
export class SendinblueService implements ISmtpService {
  private transactionalEmailsApi: TransactionalEmailsApi;

  constructor() {
    this.transactionalEmailsApi = new TransactionalEmailsApi();
    this.transactionalEmailsApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.SENDINBLUE_API_KEY);
  }

  async sendEmail(sender: string, to: string[], subject: string, htmlContent: string, textContent: string, calendarEvent?: IcalAttachment): Promise<void> {
    logger.debug(`SendinblueService.sendEmail, ${sender}, ${to}, ${subject}, ${htmlContent}, ${calendarEvent}`);
    const mailData: SendSmtpEmail = {
      sender: { email: sender },
      to: to.map(t => ({ email: t })),
      subject: subject,
      htmlContent,
      textContent
    }
    if (calendarEvent) {
      if (typeof calendarEvent.filename !== 'string' || typeof calendarEvent.content !== 'string')
        throw new Error('SendinblueService.sendEmail: Unsupported values of calendarEvent');

      mailData.attachment = [{
        name: calendarEvent.filename,
        // TODO: Change to unix style new line for outlook.com, it seems not work.
        content: btoa(calendarEvent.content.replace(/\r\n/g, '\n')),
      }]
    }
    void await this.transactionalEmailsApi.sendTransacEmail(mailData);
  }
}