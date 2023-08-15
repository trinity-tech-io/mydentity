import { Injectable } from '@nestjs/common';
import { Device, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import userAgentParser from 'ua-parser-js';

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) { }

  /**
   * Creqtes a new user bound devices and give it a default name.
   */
  public create(user: User, userAgent: string): Promise<Device> {
    const deviceName = this.generateDeviceNameFromUserAgent(userAgent);

    return this.prisma.device.create({
      data: {
        user: { connect: { id: user.id } },
        userAgent,
        name: deviceName
      }
    });
  }

  private generateDeviceNameFromUserAgent(userAgent: string): string {
    const deviceInfo = userAgentParser(userAgent);
    if (!deviceInfo)
      return "Unrecognized device";

    return `${deviceInfo.device} ${deviceInfo.browser}`;
  }

  /**
   * Returns all devices related to a user
   */
  public findAll(user: User) {
    return this.prisma.device.findMany({
      where: {
        userId: user.id
      }
    });
  }
}
