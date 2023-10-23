import { Injectable } from '@nestjs/common';
import { Browser, User } from '@prisma/client/main';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { logger } from 'src/logger';
import { PrismaService } from 'src/prisma/prisma.service';
import * as userAgentParser from 'ua-parser-js';
import { v4 } from 'uuid';

@Injectable()
export class BrowsersService {
  constructor(
    private prisma: PrismaService,
    private keyRingService: KeyRingService,
  ) { }

  /**
   * Creates a new user bound browser and give it a default name.
   */
  public create(user: User, userAgent: string, existingBrowserKey?: string): Promise<Browser> {
    logger.log("Creating browser with user agent:", userAgent);

    const deviceName = this.generateBrowserNameFromUserAgent(userAgent);

    return this.prisma.browser.create({
      data: {
        user: { connect: { id: user.id } },
        userAgent,
        name: deviceName,
        key: existingBrowserKey || v4()
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
   * - If a browser key is given, makes sure it exists in database for this user. If not, create a new one.
   * - If no browser key is given, create a new one too
   *
   * Returns the browser key to use.
   */
  public async validateOrCreateBrowserKey(user: User, userAgent: string, existingBrowserKey?: string): Promise<string> {
    let browserKey = existingBrowserKey;
    if (existingBrowserKey) {
      const existingBrowser = await this.findOne(existingBrowserKey, user);
      if (!existingBrowser)
        browserKey = null; // Consider we have no existing key, to create a new one
    }

    if (!browserKey) {
      // No browser key given, so we consider this is a brand new browser and we create a new browser info
      const browser = await this.create(user, userAgent, existingBrowserKey);
      browserKey = browser.key;
    }

    return browserKey;
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

  public findOne(browserKey: string, user?: User) {
    return this.prisma.browser.findFirst({
      where: {
        key: browserKey,
        ...(user && { userId: user.id })
      }
    });
  }

  public async deleteBrowser(browserId: string, user: User) {
    logger.log('Deleting browser with ' + browserId);

    // Remove browser shadow keys
    const shadowKeys = await this.prisma.userShadowKey.findMany({
      where: {
        browserId,
        userId: user.id
      }
    });

    for (const shadowKey of shadowKeys) {
      await this.keyRingService.removeKey(shadowKey.keyId, user);
    }

    // Remove activities
    await this.prisma.activity.deleteMany({
      where: {
        browserId: browserId,
        userId: user.id
      }
    });

    // Remove the browser itself
    await this.prisma.browser.deleteMany({
      where: {
        id: browserId,
        userId: user.id
      }
    });
  }
}
