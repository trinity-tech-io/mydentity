import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import {AuthService} from 'src/auth/auth.service';
import {PrismaService} from 'src/prisma/prisma.service';
import {ThirdPartyUser} from './dto/third-party-user';
import {MicrosoftProfileService} from './microsoft-profile.service';
import {User, UserType, UserEmail} from '@prisma/client';
import {randomUUID} from "crypto";
import * as moment from "moment";
import {encode} from "slugid";
import {EmailTemplateType} from "../emailing/email-template-type";
import {EmailingService} from "../emailing/emailing.service";
import {SignUpInput} from './dto/sign-up.input';
import {AppException} from "../exceptions/app-exception";
import {AuthExceptionCode} from "../exceptions/exception-codes";
import {CurrentUser} from "../auth/currentuser.decorator";
import {UserEntity} from "./entities/user.entity";
import {UserEmailEntity} from "./entities/user-email.entity";

// https://makinhs.medium.com/authentication-made-easy-with-nestjs-part-4-of-how-to-build-a-graphql-mongodb-d6057eae3fdf
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private readonly microsoftProfileService: MicrosoftProfileService,
    @Inject(forwardRef(() => EmailingService)) private emailingService: EmailingService,
  ) { }

  /**
   * Creates a user with only a single name (optional).
   */
  public async signUp(input: SignUpInput) {
    // TODO: save name from the input - but cannot generate a VC, this is ok, this is the account profile, not identity profile

    const user = await this.prisma.user.create({
      data: {
        type: UserType.EMAIL // TODO: THIS IS WRONG, should not need to have a user "type" that depends on the auth method
      }
    });
    return this.authService.generateUserCredentials(user);
  }

  /**
   * Bind email or sign-in by the microsoft/google/linkedin user, etc.
   * 1. generate access/refresh token if email relating user exists.
   *
   * @param thirdPartyUser
   */
  async signInByThirdPartyAuth(thirdPartyUser: ThirdPartyUser) {
    const retValue = {
      email: thirdPartyUser.email,
      accessToken: null,
      refreshToken: null,
    }

    // if there is a user with email.
    const userEmail: UserEmail & {user: User} = await this.prisma.userEmail.findFirst({
      where: {
        email: thirdPartyUser.email
      },
      include: {
        user: true
      }
    });
    if (userEmail) {
      const result = await this.authService.generateUserCredentials(userEmail.user);
      retValue.accessToken = result.accessToken;
      retValue.refreshToken = result.refreshToken;
    }

    // await this.microsoftProfileService.retrieveAvatarPicture(
    //     thirdPartyUser,
    //     user,
    // );

    return retValue;
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

    console.log("user", userEmail)

    if (!curUser && !userEmail) { // login
      throw new AppException(AuthExceptionCode.EmailNotExists, 'Email not exists.', 404);
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
            name: user.type !== UserType.EMAIL && user.fullName
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
  public async checkEmailAuthentication(curUser: UserEntity, temporaryEmailAuthKey: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        temporaryEmailAuthExpiresAt: { gt: new Date() },
        temporaryEmailAuthKey
      }
    });
    if (!user) {
      throw new AppException(AuthExceptionCode.AuthKeyNotExists, "This temporary authentication key is expired or invalid.", 401);
    // } else if (user.id !== curUser.id) {
    //   throw new AppException(AuthExceptionCode.EmailNotExists, "This temporary authentication key is expired or invalid..", 401);
    }

    console.log('checkEmailAuthentication', user);

    if (!curUser) // login
      await this.maybeSendWelcomeEmail(user, user.temporaryEmail);
    else { // bind email
      await this.prisma.userEmail.upsert({
        where: {
          email: user.temporaryEmail
        },
        create: {
          email: user.temporaryEmail,
          user: {connect: {id: curUser.id}},
          createdAt: new Date()
        },
        update: {
          // do nothing.
        }
      })
    }

    return this.authService.generateUserCredentials(user);
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: { id: id }
    })
  }

  async refreshAccessToken(user: User) {
    return this.authService.refreshAccessToken(user);
  }

  async getUserByToken(token: string): Promise<User> {
    const data = this.authService.getTokenPayload(token);
    const user = await this.findOne(data.sub);
    if (!user)
      throw new Error(`Can not find user by refresh token.`);

    return user;
  }

  /**
   * Bind oauth email to user.
   * @param user
   * @param email
   */
  async bindOauthEmail(user, email: string) {
    const userEmail: UserEmailEntity = await this.prisma.userEmail.findFirst({
      where: { email },
      include: { user: true }
    })

    if (userEmail && userEmail.user.id !== user.id) {
      throw new AppException(AuthExceptionCode.AuthError, `Email ${email} already belongs to other user.`, 401);
    } else if (!userEmail) {
      await this.prisma.userEmail.upsert({
        where: { email },
        create: {
          email,
          user: {connect: {id: user.id}},
          createdAt: new Date()
        },
        update: {
          // do nothing.
        }
      })
    }

    return user;
  }
}
