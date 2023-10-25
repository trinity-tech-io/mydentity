import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Intent } from '@prisma/client/main';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIntentInput } from './dto/create-intent.input';
import { FulfilIntentInput } from './dto/fulfil-intent.input';

@Injectable()
export class IntentsService {
  private logger: Logger;
  constructor(private prisma: PrismaService) {
    this.logger = new Logger("intents");
  }

  createIntent(input: CreateIntentInput) {
    return this.prisma.intent.create({
      data: {
        type: input.type,
        requestPayload: input.payload,
        redirectUrl: input.redirectUrl
      }
    });
  }

  async fulfilIntent(input: FulfilIntentInput): Promise<boolean> {
    const updateResult = await this.prisma.intent.update({
      where: {
        id: input.intentId
      },
      data: {
        responsePayload: input.payload,
        fulfilledAt: new Date()
      }
    });

    return !!updateResult;
  }

  /**
   * Serves a previously fulfilled intent's response, in theory to the connector SDK that requested this intent initially.
   * - The intent must exist
   * - The response payload must have been created (filled by the UI)
   * - After calling this method, the intent is deleted from our side
   * - The deleted intent is returned
   */
  async serveIntentResponse(id: string): Promise<Intent> {
    const intent = await this.findOne(id);

    if (!intent)
      return null;

    // Has the intent been fulfilled?
    if (!intent.fulfilledAt) {
      this.logger.warn(`Cannot serve intent response for intent ${id} because no response has been generated yet`);
      return null;
    }

    // Intent has been handled by the requester, remove it on our side.
    await this.deleteOne(id);

    return intent;
  }

  findOne(id: string) {
    return this.prisma.intent.findUnique({
      where: { id }
    })
  }

  private deleteOne(id: string) {
    return this.prisma.intent.delete({
      where: {
        id
      }
    })
  }

  /**
   * Deletes all expired intents from the database, to not keep cleartext trace.
   * Expired intent means intent that has a creation date older than X minutes.
   */
  private async deleteExpiredIntents() {
    const fiveMinutesAgo = moment().subtract(5, "minutes");
    this.prisma.intent.deleteMany({
      where: {
        createdAt: { lt: fiveMinutesAgo.toDate() }
      },
    });
  }

  /**
   * Expired intents cleanup task.
   * Every minute.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    await this.deleteExpiredIntents();
  }
}
