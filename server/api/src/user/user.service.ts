import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThirdPartyUser } from './dto/third-party-user';
import { MicrosoftProfileService } from './microsoft-profile.service';
import { User, UserType } from '@prisma/client';
import { randomUUID } from "crypto";
import * as moment from "moment";
import { encode } from "slugid";
import { EmailTemplateType } from "../emailing/email-template-type";
import { EmailingService } from "../emailing/emailing.service";
import { SignUpInput } from './dto/sign-up.input';

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
   * Update the profiles of the microsoft/google/linkedin user etc.
   * 1. email as a key to fetch user.
   * 2. upsert all information to profile table.
   *
   * @param thirdPartyUser
   */
  async signInByThirdPartyAuth(thirdPartyUser: ThirdPartyUser) {
    let user: User = await this.prisma.user.findFirst({
      where: {
        email: thirdPartyUser.email
      }
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name: '',
          email: thirdPartyUser.email,
          type: UserType.MICROSOFT,
          fullName: `${thirdPartyUser.firstName}, ${thirdPartyUser.lastName}`,
        }
      })
    }

    await this.microsoftProfileService.retrieveAvatarPicture(
        thirdPartyUser,
        user,
    );

    return this.authService.generateUserCredentials(user);
  }

  /**
   * When a user tries to get a magic authentication link by email,
   * and this email doesn't exist yet, we create a temporary user.
   * This doesn't mean that the email is valid yet.
   */
  private async createEmailAuthUser(emailAddress: string): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: '',
        type: UserType.EMAIL,
        email: emailAddress,
        fullName: '',
      }
    });
  }

  /**
   * Initiates a new authentication by email, using a magic link.
   */
  public async requestEmailAuthentication(emailAddress: string) {
    // Check if a user exists with this authentication mode and email already. If not, create a user.
    let user: User = await this.prisma.user.findFirst({
      where: {
        email: emailAddress
      }
    })

    console.log("user", user, emailAddress)

    if (!user) {
      // No user, create one
      user = await this.createEmailAuthUser(emailAddress);
    }

    // Generate a temporary auth token with short expiration date into the user object
    const temporaryEmailAuthKey = randomUUID();
    const temporaryEmailAuthExpiresAt = moment().add(10, 'minutes').toDate();

    await this.prisma.user.update({
      where: { id: user.id },
      data: { temporaryEmailAuthKey, temporaryEmailAuthExpiresAt }
    });

    // Send the authentication link by email.
    const magicLink = `${process.env.FRONTEND_URL}/checkauthkey?key=${encode(temporaryEmailAuthKey)}`;
    this.emailingService.sendEmail(EmailTemplateType.EMAIL_AUTHENTICATION, "DID Service <email-auth@didservice.io>", emailAddress, "Sign in with your magic link", {
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
  public async checkEmailAuthentication(temporaryEmailAuthKey: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        temporaryEmailAuthExpiresAt: { gt: new Date() },
        temporaryEmailAuthKey
      }
    });

    if (!user)
      return new HttpException("This temporary authentication key is expired or invalid", 401);

    await this.maybeSendWelcomeEmail(user, user.email);

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
}
