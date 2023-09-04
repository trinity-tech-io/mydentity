import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { User, UserEmail } from '@prisma/client';
import { randomUUID } from "crypto";
import * as moment from "moment";
import { encode } from "slugid";
import { AuthService } from 'src/auth/auth.service';
import { AuthTokens } from 'src/auth/model/auth-tokens';
import { AuthKeyInput } from 'src/key-ring/dto/auth-key-input';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailTemplateType } from "../emailing/email-template-type";
import { EmailingService } from "../emailing/emailing.service";
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { SignUpInput } from './dto/sign-up.input';
import { UserPropertyInput } from "./dto/user-property.input";
import { UserEmailEntity } from "./entities/user-email.entity";
import { UserEntity } from "./entities/user.entity";

// https://makinhs.medium.com/authentication-made-easy-with-nestjs-part-4-of-how-to-build-a-graphql-mongodb-d6057eae3fdf
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private keyRingService: KeyRingService,
    @Inject(forwardRef(() => EmailingService)) private emailingService: EmailingService,
  ) { }

  /**
   * Creates a user with only a single name (optional).
   */
  public async signUp(input: SignUpInput, existingBrowserId: string, userAgent: string): Promise<AuthTokens> {
    // TODO: save name from the input - but cannot generate a VC, this is ok, this is the account profile, not identity profile

    const user = await this.prisma.user.create({
      data: {
        name: input.name,
        createdAt: new Date()
      }
    });

    logger.log('user', 'sign up with new user', user);

    return this.authService.generateUserCredentials(user, existingBrowserId, userAgent);
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
  async signInByOauthEmail(email: string, browserId: string, userAgent: string) {
    const userEmail: UserEmail & { user: User } = await this.getUserEmailByEmail(email);
    if (!userEmail) {
      return null;
    }

    return await this.authService.generateUserCredentials(userEmail.user, browserId, userAgent);
  }

  /**
   * Initiates a new authentication by email, using a magic link.
   */
  public async requestEmailAuthentication(curUser: UserEntity, emailAddress: string) {
    const userEmail: UserEmailEntity = await this.prisma.userEmail.findFirst({
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
    this.emailingService.sendEmail(template, "DID Service <email-auth@didservice.io>", emailAddress, subject, {
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
  public async checkEmailAuthentication(curUser: UserEntity, temporaryEmailAuthKey: string, existingBrowserId: string, userAgent: string): Promise<AuthTokens> {
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

    if (!curUser) // login
      await this.maybeSendWelcomeEmail(user, user.temporaryEmail);
    else { // bind email
      await this.prisma.userEmail.upsert({
        where: {
          email: user.temporaryEmail
        },
        create: {
          email: user.temporaryEmail,
          user: { connect: { id: curUser.id } },
          createdAt: new Date()
        },
        update: {
          // do nothing.
        }
      })
    }

    return this.authService.generateUserCredentials(user, existingBrowserId, userAgent);
  }

  public async signInWithPasskey(passkeyAuthKey: AuthKeyInput, headerBrowserId: string, userAgent: string): Promise<AuthTokens> {
    const user = await this.keyRingService.getUserFromWebAuthnResponse(passkeyAuthKey);
    if (!user)
      throw new AppException(AuthExceptionCode.InexistingUser, "No user found matching this browser authentication", 403);

    return this.authService.generateUserCredentials(user, headerBrowserId, userAgent);
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: id }
    })
  }

  async refreshAccessToken(user: User, existingBrowserId?: string, userAgent?: string) {
    return this.authService.refreshAccessToken(user, existingBrowserId, userAgent);
  }

  async getUserByToken(token: string): Promise<User> {
    const data = this.authService.getTokenPayload(token);
    const user = await this.findOne(data.sub);
    if (!user)
      throw new Error(`Can not find user by access token.`);

    return user;
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const userEmail: UserEmail & { user: UserEntity } = await this.getUserEmailByEmail(email);
    return userEmail ? userEmail.user : null;
  }

  /**
   * Bind oauth email to user.
   * @param user
   * @param email
   */
  async bindOauthEmail(user: UserEntity, email: string) {
    const userEmail: UserEmailEntity = await this.prisma.userEmail.findFirst({
      where: { email },
      include: { user: true }
    })

    if (userEmail && userEmail.user.id !== user.id) {
      logger.log('user', 'failed to bind user email as exists on other user.', user, userEmail);
      return null;
    } else if (!userEmail) {
      await this.prisma.userEmail.upsert({
        where: { email },
        create: {
          email,
          user: { connect: { id: user.id } },
          createdAt: new Date()
        },
        update: {
          // do nothing.
        }
      })
    }

    logger.log('user', 'bind user with email successfully', user, email);

    return user;
  }

  async listUserEmails(user: UserEntity) {
    return await this.prisma.userEmail.findMany({
      where: {
        userId: user.id
      }
    })
  }

  async deleteUserEmail(user: UserEntity, email: string) {
    const userEmail: UserEmailEntity = await this.prisma.userEmail.findFirst({
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

  async updateUserProperty(user: UserEntity, input: UserPropertyInput) {
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
}
