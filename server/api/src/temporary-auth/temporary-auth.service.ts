import { Injectable } from '@nestjs/common';
import { TemporaryAuthentication, User } from '@prisma/client/main';
import { randomUUID } from 'crypto';
import * as moment from 'moment';
import { ActivityService } from 'src/activity/activity.service';
import { BrowsersService } from 'src/browsers/browsers.service';
import { PasswordHash } from 'src/crypto/passwordhash';
import { EmailingService } from 'src/emailing/emailing.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { randomDigits } from 'src/utils/random';

@Injectable()
export class TemporaryAuthService {

  constructor(
    private prisma: PrismaService,
    private emailingService: EmailingService,
    private readonly browsersService: BrowsersService,
    private readonly activityService: ActivityService
  ) { }

  public async createTemporaryAuthenticationRequest(user: User, emailAddress?: string): Promise<{ auth: TemporaryAuthentication, pinCode: string }> {
    const pinCode = randomDigits(6);
    const pinHash = PasswordHash.hash(pinCode);

    const auth = await this.prisma.temporaryAuthentication.create({
      data: {
        user: { connect: { id: user.id } },
        authKey: randomUUID(),
        pinHash,
        expiresAt: moment().add(10, 'minutes').toDate(),
        temporaryEmail: emailAddress
      }
    });

    return { auth, pinCode };
  }

  /**
   * Checks if there is a pending auth key that matches the given key.
   * This auth key comes from a magic link received by users by email or from a directly shared url.
   */
  public async checkAuthentication(authKey: string): Promise<TemporaryAuthentication & { user: User }> {
    const pinCode = "000000"; // TOOD, from input

    const temporaryAuthentication = await this.prisma.temporaryAuthentication.findFirst({
      where: {
        expiresAt: { gt: new Date() },
        authKey: authKey,
      },
      include: {
        user: true
      }
    });

    if (!temporaryAuthentication)
      throw new AppException(AuthExceptionCode.InexistingAuthKey, "This temporary authentication key is expired or invalid.", 401);

    if (!PasswordHash.verify(temporaryAuthentication.pinHash, pinCode))
      throw new AppException(AuthExceptionCode.InvalidPINCode, "The provided PIN code is not valid", 401);

    return temporaryAuthentication;
  }
}
