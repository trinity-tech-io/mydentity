import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ActivityType, Prisma, User, UserEmail, UserEmailProvider } from '@prisma/client/main';
import { createHash, randomBytes, randomUUID } from "crypto";
import * as moment from "moment";
import { encode } from "slugid";
import { AuthService } from 'src/auth/auth.service';
import { AuthTokens } from 'src/auth/model/auth-tokens';
import { DidService } from 'src/did/did.service';
import { AuthKeyInput } from 'src/key-ring/dto/auth-key-input';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityService } from "../activity/activity.service";
import { BrowsersService } from "../browsers/browsers.service";
import { EmailTemplateType } from "../emailing/email-template-type";
import { EmailingService } from "../emailing/emailing.service";
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { SignUpInput } from './dto/sign-up.input';
import { UserPropertyInput } from "./dto/user-property.input";

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
    private readonly didService: DidService,
    private readonly keyRingService: KeyRingService,
    @Inject(forwardRef(() => EmailingService)) private readonly emailingService: EmailingService,
    private readonly browsersService: BrowsersService,
    private readonly activityService: ActivityService,
  ) { }

  /**
   * Creates a user with only a single name (optional).
   */
  public async signUp(input: SignUpInput, existingBrowserKey: string, userAgent: string): Promise<AuthTokens> {
    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        createdAt: new Date()
      }
    });

    logger.log('user', 'sign up with new user', user);

    return this.authService.generateUserCredentials(user, existingBrowserKey, userAgent);
  }

  /**
   * Creates a hidden user that nobody can use to sign in, but that can hold temporarily created identities
   * by the SDK, from third party apps.
   */
  public async createUnmanagedUser(): Promise<User> {
    // TODO: store creating app DID and access token ? (to identity the user account)

    const user = await this.prisma.user.create({
      data: {
        createdAt: new Date()
      }
    });

    logger.log('user', 'Created a new unmanaged user', user);

    return user;
  }

  /**
   * Bind email or sign-in by the microsoft/google/linkedin user, etc.
   * 1. generate access/refresh token if email relating user exists.
   *
   * @param thirdPartyUser
   */
  /* async signInByThirdPartyAuth(thirdPartyUser: ThirdPartyUser) {
    const retValue: AuthTokens & { email: string } = {
      email: thirdPartyUser.email,
      accessToken: null,
      refreshToken: null,
    }

    // if there is a user with email.
    const userEmail = await this.prisma.userEmail.findFirst({
      where: {
        email: thirdPartyUser.email
      },
      include: {
        user: true
      }
    });

    if (userEmail) {
      const result = await this.authService.generateUserCredentials(userEmail.user, null, "TODO USER AGENT");
      retValue.accessToken = result.accessToken;
      retValue.refreshToken = result.refreshToken;
    }

    // await this.microsoftProfileService.retrieveAvatarPicture(
    //     thirdPartyUser,
    //     user,
    // );

    logger.log('user', 'return value for sign-in or bind email', retValue);

    return retValue;
  } */

  private getUserEmailByEmail(email: string): Promise<UserEmail & { user: User }> {
    return this.prisma.userEmail.findFirst({
      where: {
        email
      },
      include: {
        user: true
      }
    });
  }

  /**
   * Just execute with oauth email.
   */
  async signInByOauthEmail(email: string, emailProvider: UserEmailProvider, browserKey: string, userAgent: string) {
    const userEmail: UserEmail & { user: User } = await this.getUserEmailByEmail(email);
    if (!userEmail) {
      return null;
    }

    {
      const browser = await this.browsersService.findOne(browserKey);
      await this.activityService.createActivity(userEmail.user, {
        type: ActivityType.USER_SIGN_IN,
        userEmailId: userEmail.id,
        userEmailProvider: emailProvider,
        userEmailAddress: userEmail.email,
        browserId: browser.id,
        browserName: browser.name,
      });
    }

    return await this.authService.generateUserCredentials(userEmail.user, browserKey, userAgent);
  }

  /**
   * Initiates a new authentication by email, using a magic link.
   */
  public async requestEmailAuthentication(curUser: User, emailAddress: string) {
    const userEmail = await this.prisma.userEmail.findFirst({
      where: {
        email: emailAddress,
      },
      include: {
        user: true,
      }
    })

    if (!curUser && !userEmail) { // login
      throw new AppException(AuthExceptionCode.InexistingEmail, 'This email address is unknown.', 404);
    } else if (curUser && userEmail) { // bind
      throw new AppException(AuthExceptionCode.EmailAlreadyExists, 'Email already exists.', 409);
    }

    let template = EmailTemplateType.EMAIL_AUTHENTICATION;
    let subject = "Sign in with your magic link";
    let user = null;
    if (curUser) {
      user = curUser;
      template = EmailTemplateType.EMAIL_BIND;
      subject = "Bind email with your magic link";
    } else {
      user = userEmail.user;
    }

    // Generate a temporary auth token with short expiration date into the user object
    const temporaryEmailAuthKey = randomUUID();
    const temporaryEmailAuthExpiresAt = moment().add(10, 'minutes').toDate();
    const temporaryEmail = emailAddress;

    await this.prisma.user.update({
      where: { id: user.id },
      data: { temporaryEmailAuthKey, temporaryEmailAuthExpiresAt, temporaryEmail }
    });

    // Send the authentication link by email.
    const magicLink = `${process.env.FRONTEND_URL}/checkauthkey?key=${encode(temporaryEmailAuthKey)}`;
    await this.emailingService.sendEmail(template, "DID Service <email-auth@didservice.io>", emailAddress, subject, {
      magicLink
    });

    return null;
  }

  /**
   * Checks if the welcome email has been sent for the user and if not,
   * sends it if we have a known email address.
   */
  private async maybeSendWelcomeEmail(user: User, emailAddress: string): Promise<boolean> {
    if (user.welcomeEmailSentAt)
      return false; // Already sent, skip

    const loungeUrl = `${process.env.FRONTEND_URL}/dashboard`;
    this.emailingService.sendEmail(
      EmailTemplateType.WELCOME,
      "welcome@didservice.io",
      emailAddress,
      "Welcome to DidService.io",
      {
        user: {
          // Use the name only if that's not a temporary name (real user signed in)
          name: user.name
        },
        loungeUrl
      }
    );

    // Remember we've sent the welcome email
    await this.prisma.user.update({
      where: { id: user.id },
      data: { welcomeEmailSentAt: new Date() }
    });

    return true;
  }

  /**
   * Checks if there is a pending auth key that matches the given key.
   * This auth key comes from a magic link received by users by email, after requesting
   * to receive a magic link by email.
   */
  public async checkEmailAuthentication(curUser: User, temporaryEmailAuthKey: string, existingBrowserKey: string, userAgent: string): Promise<AuthTokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        temporaryEmailAuthExpiresAt: { gt: new Date() },
        temporaryEmailAuthKey
      }
    });
    if (!user) {
      throw new AppException(AuthExceptionCode.InexistingAuthKey, "This temporary authentication key is expired or invalid.", 401);
      // } else if (user.id !== curUser.id) {
      //   throw new AppException(AuthExceptionCode.EmailNotExists, "This temporary authentication key is expired or invalid..", 401);
    }

    if (!curUser) { // login
      await this.maybeSendWelcomeEmail(user, user.temporaryEmail);
    } else { // bind email
      await this.prisma.userEmail.upsert({
        where: {
          email: user.temporaryEmail
        },
        create: {
          email: user.temporaryEmail,
          provider: UserEmailProvider.RAW,
          user: { connect: { id: curUser.id } },
          createdAt: new Date()
        },
        update: {
          // do nothing.
        }
      })
    }

    {
      const userEmail = await this.prisma.userEmail.findFirst({
        where: {
          email: user.temporaryEmail,
        }
      });
      if (!userEmail) {
        throw new AppException(AuthExceptionCode.InexistingEmail, "No email address with auth key existing.", 401);
      }

      const browser = await this.browsersService.findOne(existingBrowserKey);
      await this.activityService.createActivity(user, {
        type: !curUser ? ActivityType.USER_SIGN_IN : ActivityType.BIND_EMAIL,
        userEmailId: userEmail.id,
        userEmailProvider: UserEmailProvider.RAW,
        userEmailAddress: userEmail.email,
        browserId: !curUser ? browser.id : undefined,
        browserName: !curUser ? browser.name : undefined,
      });
    }

    return this.authService.generateUserCredentials(user, existingBrowserKey, userAgent);
  }

  public async signInWithPasskey(passkeyAuthKey: AuthKeyInput, headerBrowserKey: string, userAgent: string): Promise<AuthTokens> {
    const user = await this.keyRingService.getUserFromWebAuthnResponse(passkeyAuthKey);
    if (!user)
      throw new AppException(AuthExceptionCode.InexistingUser, "No user found matching this browser authentication", 403);

    return this.authService.generateUserCredentials(user, headerBrowserKey, userAgent);
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: id }
    })
  }

  async refreshAccessToken(user: User, existingBrowserKey?: string, userAgent?: string) {
    return this.authService.refreshAccessToken(user, existingBrowserKey, userAgent);
  }

  async getUserByAccessToken(token: string): Promise<User> {
    const data = this.authService.getTokenPayload(token);
    const user = await this.findOne(data.sub);
    if (!user)
      throw new Error(`Can not find user by access token.`);

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const userEmail: UserEmail & { user: User } = await this.getUserEmailByEmail(email);
    return userEmail ? userEmail.user : null;
  }

  /**
   * Bind oauth email to user.
   */
  async bindOauthEmail(user: User, email: string, emailProvider: UserEmailProvider) {
    let userEmail = await this.prisma.userEmail.findFirst({
      where: { email },
      include: { user: true }
    })

    if (userEmail && userEmail.user.id !== user.id) {
      logger.log('user', 'failed to bind user email as exists on other user.', user, userEmail);
      return null;
    } else if (!userEmail) {
      userEmail = await this.prisma.userEmail.upsert({
        where: { email },
        create: {
          email,
          provider: emailProvider,
          user: { connect: { id: user.id } },
          createdAt: new Date()
        },
        update: {
          // do nothing.
        },
        include: {
          user: true
        }
      })
    }

    await this.activityService.createActivity(user, {
      type: ActivityType.BIND_EMAIL,
      userEmailId: userEmail.id,
      userEmailProvider: emailProvider,
      userEmailAddress: userEmail.email,
    });

    logger.log('user', 'bind user with email successfully', user, email);

    return user;
  }

  async listUserEmails(user: User) {
    return await this.prisma.userEmail.findMany({
      where: {
        userId: user.id
      }
    })
  }

  async deleteUserEmail(user: User, email: string) {
    const userEmail = await this.prisma.userEmail.findFirst({
      where: {
        email
      },
      include: {
        user: true
      }
    });

    if (!userEmail)
      return

    if (userEmail.user.id !== user.id) {
      throw new AppException(AuthExceptionCode.AuthError, `No permission to remove email ${email}`, 401);
    }

    await this.prisma.userEmail.delete({
      where: {
        id: userEmail.id
      }
    });
  }

  async updateUserProperty(user: User, input: UserPropertyInput) {
    const data = {};
    if (input.name) {
      data['name'] = input.name;
    }

    const existingUser: User = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data
    })

    return existingUser;
  }

  async updateUserDefaultRootIdentityId(user: User, defaultRootIdentityId: string) {
    const existingUser: User = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        defaultRootIdentityId: defaultRootIdentityId,
      }
    })

    return existingUser;
  }

  /**
   * Creates a developer access key to be able to remotely access apis
   */
  async createAccessKey(user: User) {
    // Generate an access key (not stored, one time display to user)
    const clearKey = randomBytes(32).toString('hex');
    const hashedKey = createHash('sha256').update(clearKey).digest('hex');

    const storedKey = await this.prisma.developerAccessKey.create({
      data: {
        userId: user.id,
        title: "My access key",
        hash: hashedKey
      }
    });

    return {
      storedKey,
      clearKey
    }
  }

  /**
   * List of access keys owned by this user for third party app development purpose.
   */
  async getAccessKeys(user: User) {
    return this.prisma.developerAccessKey.findMany({
      where: {
        userId: user.id
      }
    });
  }

  public async validateDeveloperAccessKey(developerAccessKey: string): Promise<User> {
    const keyHash = createHash('sha256').update(developerAccessKey).digest('hex');

    const key = await this.prisma.developerAccessKey.findUnique({
      where: {
        hash: keyHash
      },
      include: {
        user: true
      }
    });

    return key?.user;
  }

  public async getUserEmail(user: User) {
    return this.prisma.userEmail.findFirst({
      where: { userId: user.id }
    });
  }

  /**
   * Transfer all existing content from a user to another, including:
   * - all identities and their identity roots
   * - all activities related to those identities
   * - all credentials
   */
  public async transfer(claimRequestId: string, from: User, fromMasterKey: string, to: User, toMasterKey: string) {
    await this.didService.transfer(from.id, fromMasterKey, to.id, toMasterKey);

    await this.prisma.$transaction<void>(async (tx) => {
      // Transfer identity roots
      await tx.identityRoot.updateMany({
        where: { userId: from.id },
        data: { userId: to.id }
      });

      // Transfer identities
      await tx.identity.updateMany({
        where: { userId: from.id },
        data: { userId: to.id }
      });

      // Transfer activities
      await tx.activity.updateMany({
        where: { userId: from.id },
        data: { userId: to.id }
      });

      await tx.identityClaimRequest.update({
        where: { id: claimRequestId },
        data: { claimCompletedAt: new Date() }
      });
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable
    });
  }
}
