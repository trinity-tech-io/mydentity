import { Injectable } from '@nestjs/common';
import validateEmail from 'deep-email-validator';
import { readFileSync } from 'fs';
import Handlebars from 'handlebars';
import { convert as htmlToText } from "html-to-text";
import { cloneDeep } from 'lodash';
import { IcalAttachment } from 'nodemailer/lib/mailer';
import { join } from 'path';
import fillPlaceholders from "string-placeholder";
import { logger } from "../logger";
import { EmailTemplateType } from './email-template-type';
import { ISmtpService } from './ismtp.service';
import { Smtp4devService } from './smtp-services/smtp4dev.service';
import { ZeptoMailService } from './smtp-services/zeptomail.service';

enum SmtpService {
  SMTP4DEV = "smtp4dev", // local smtp4dev docker smtp to simply debug emails without really sending them
  ZEPTOMAIL = "zeptomail" // transactionnal email service from zoho
}

export type EmailContentReplacements = {
  [placeholder: string]: string; // placeholder -> real value pairs
}

@Injectable()
export class EmailingService {
  private templates: { [templateName: string]: HandlebarsTemplateDelegate } = {};

  constructor(
    private smtp4devService: Smtp4devService,
    private zeptoMailService: ZeptoMailService
  ) {
    Handlebars.registerHelper('breaklines', function (text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });

    this.registerHandlebarsPartials();
    this.loadTemplates();
  }

  private registerHandlebarsPartials() {
    Handlebars.registerPartial('whatIsDIDService', this.loadHandlebarsPart("what-is-didservice"));
    Handlebars.registerPartial('mainMeta', this.loadHandlebarsPart("main-meta"));
    Handlebars.registerPartial('mainStyle', this.loadHandlebarsPart("main-style"));
    Handlebars.registerPartial('header', this.loadHandlebarsPart("header"));
    Handlebars.registerPartial('footer', this.loadHandlebarsPart("footer"));
  }

  private loadHandlebarsPart(partName: string): string {
    return readFileSync(join(process.cwd(), `assets/email-templates-parts/${partName}.hbs`)).toString("utf-8")
  }

  private loadTemplates() {

    for (const key of Object.values(EmailTemplateType)) {
      this.loadTemplate(<EmailTemplateType>key);
    }
  }

  private loadTemplate(templateType: EmailTemplateType) {
    this.templates[templateType] = Handlebars.compile(readFileSync(join(process.cwd(), `assets/email-templates/${templateType}.hbs`)).toString("utf-8"));
  }

  /**
   * Return the html result after applying data to the given email template
   */
  public templatify(templateType: EmailTemplateType, data, forceReloadTemplate = false): string {
    if (forceReloadTemplate)
      this.loadTemplate(templateType);

    return this.templates[templateType](data);
  }

  private async canSendEmailTo(email: string): Promise<boolean> {
    const res = await validateEmail({
      email,
      validateRegex: true,
      validateMx: true,
      validateTypo: false,
      validateDisposable: true,
      validateSMTP: false, // Services like hotmail return "Mailbox not found" on purpose, probably against bots, so we can't rely on this
    });

    if (!res.valid)
      logger.warn("Won't send email to:", email, res);

    return res.valid;
  }

  public async sendEmail(emailTemplate: EmailTemplateType, from: string, to: string | Array<string>, subject: string, data: { [key: string]: any }, calendarEvent?: IcalAttachment): Promise<boolean> {
    if (!(emailTemplate in this.templates)) {
      throw new Error(`Email template of given type ${emailTemplate} does not exist. Did you forget to load it in the emailing service?`);
    }

    // Clone input data to avoid modification before sending
    data = cloneDeep(data);

    // Verify emails as best as we can
    const destinationCandidates = to instanceof Array ? to : [to];
    const verifiedDestinations: string[] = [];
    for (const email of destinationCandidates) {
      if (await this.canSendEmailTo(email))
        verifiedDestinations.push(email);
    }

    if (verifiedDestinations.length === 0)
      return false; // TODO: USER FRIENDLY ERROR MESSAGE TO TELL WHY THIS HAS FAILED

    // Append generic data
    data = {
      ...data,
      // headerLogo: `${process.env.SERVER_URL}/images/logos/didservice-100.png`
      headerLogo: `${process.env.FRONTEND_URL}/did-logo.png`
    }

    const htmlContent = this.templates[emailTemplate](data);
    const textContent = htmlToText(htmlContent);

    try {
      await this.getSmtpService().sendEmail(from, verifiedDestinations, subject, htmlContent, textContent, calendarEvent);
      return true;
    } catch (e) {
      logger.error('EmailingService', 'Failed to send email');
      console.error(e);
      return false;
    }
  }

  private getSmtpService(): ISmtpService {
    const service = process.env.SMTP_SERVICE;
    switch (service) {
      case SmtpService.SMTP4DEV:
        return this.smtp4devService;
      case SmtpService.ZEPTOMAIL:
        return this.zeptoMailService;
      default:
        throw new Error(`Unknown STMP service ${service}`)
    }
  }

  /**
   * Search the given content for placeholders providers as keys of "replacements" and replaces
   * them with key values from "replacements".
   *
   * Placeholders format in content: {{myVar}}
   */
  public fillEmailContentPlaceholders(content: string, replacements: EmailContentReplacements): string {
    return fillPlaceholders(content, replacements, {
      before: '{{',
      after: '}}'
    });
  }
}
