import { Injectable } from '@nestjs/common';
import { Browser, User } from '@prisma/client';
import { logger } from 'src/logger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as userAgentParser from 'ua-parser-js';

@Injectable()
export class BrowsersService {
  constructor(private prisma: PrismaService) { }

  /**
   * Creates a new user bound browser and give it a default name.
   */
  public create(user: User, userAgent: string): Promise<Browser> {
    logger.log("Creating browser with user agent:", userAgent);

    const deviceName = this.generateBrowserNameFromUserAgent(userAgent);

    return this.prisma.browser.create({
      data: {
        user: { connect: { id: user.id } },
        userAgent,
        name: deviceName
      }
    });
  }

  private generateBrowserNameFromUserAgent(userAgent: string): string {
    const agentInfo = userAgentParser(userAgent);
    if (!agentInfo)
      return "Unrecognized device";

    return `${agentInfo.device.vendor} ${agentInfo.device.model} ${agentInfo.browser.name}`;
  }

  /**
   * - If a browser id is given, makes sure it exists in database. If not, create a new one and return another browser id.
   * - If no browser id is given, create a new one too
   */
  public async validateOrCreateBrowserId(user: User, userAgent: string, existingBrowserId?: string): Promise<string> {
    let browserId = existingBrowserId;
    if (existingBrowserId) {
      const existingBrowser = await this.findOne(existingBrowserId, user);
      if (!existingBrowser)
        browserId = null; // Consider we have no existing id, to create a new one
    }

    if (!browserId) {
      // No browser id given, so we consider this is a brand new browser and we create a new browser info
      const browser = await this.create(user, userAgent);
      browserId = browser.id;
    }

    return browserId;
  }

  /**
   * Returns all devices related to a user
   */
  public findAll(user: User) {
    return this.prisma.browser.findMany({
      where: {
        userId: user.id
      }
    });
  }

  public findOne(browserId: string, user?: User) {
    return this.prisma.browser.findUnique({
      where: {
        id: browserId,
        ...(user && { userId: user.id })
      }
    });
  }

  public async deleteBrowser(browserId: string, user?: User) {
    logger.log('deleteBrowser ' + browserId)

    // TODO: delete potential dependencies.
    // remove shadowKey

    await this.prisma.browser.delete({
      where: {
        id: browserId,
        ...(user && { userId: user.id })
      }
    });
  }
}
