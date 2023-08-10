import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThirdPartyUser } from './dto/third-party-user';
import { MicrosoftProfileService } from './microsoft-profile.service';
import { ProfileTitle } from './profile-title';
import { ProfileType } from './profile-type';
import { ProfileEntry, User, UserType } from '@prisma/client';
import { randomUUID } from "crypto";
import * as moment from "moment";
import { encode } from "slugid";
import { generateRandomTempName } from "./name-generator";
import { EmailTemplateType } from "../emailing/email-template-type";
import { EmailingService } from "../emailing/emailing.service";

// https://makinhs.medium.com/authentication-made-easy-with-nestjs-part-4-of-how-to-build-a-graphql-mongodb-d6057eae3fdf
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private readonly microsoftProfileService: MicrosoftProfileService,
    @Inject(forwardRef(() => EmailingService)) private emailingService: EmailingService,
  ) {}

  /**
   * Update the profiles of the google/linkedin user etc.
   * 1. email as a key to fetch user.
   * 2. upsert all information to profile table.
   *
   * @param thirdPartyUser
   */
  async singInByThirdPartyAuth(thirdPartyUser: ThirdPartyUser) {
    let user: User = null;
    const emailProfile = await this.prisma.profileEntry.findFirst({
      where: {
        type: ProfileType.EMAIL,
        title: thirdPartyUser.userProfileTitle,
        value: thirdPartyUser.email,
      },
      include: { user: true },
    });
    if (!emailProfile) {
      // UserEntity not found.
      user = await this.prisma.user.create({
        data: {
          type: thirdPartyUser.userType,
        },
      });
    } else {
      // Got an existing user.
      user = emailProfile.user;
    }

    await this.microsoftProfileService.retrieveAvatarPicture(
      thirdPartyUser,
      user,
    );

    const profiles = [
      {
        type: ProfileType.EMAIL,
        title: thirdPartyUser.userProfileTitle,
        value: thirdPartyUser.email,
        visible: true,
        isPrimary: true,
      },
      {
        type: ProfileType.FIRSTNAME,
        title: ProfileTitle.FIRSTNAME,
        value: thirdPartyUser.firstName,
        visible: true,
        isPrimary: true,
      },
      {
        type: ProfileType.LASTNAME,
        title: ProfileTitle.LASTNAME,
        value: thirdPartyUser.lastName,
        visible: true,
        isPrimary: true,
      },
      {
        type: ProfileType.AVATAR_URL,
        title: ProfileTitle.AVATAR_URL,
        value: thirdPartyUser.picture,
        visible: true,
        isPrimary: true,
      },
      {
        type: ProfileType.TOKEN,
        title: thirdPartyUser.userProfileTitle,
        value: thirdPartyUser.accessToken,
        visible: false,
        isPrimary: true,
      },
    ];
    await Promise.all(
      profiles.map(async (p) => {
        if (!p.value) return;

        await this.prisma.profileEntry.upsert({
          where: {
            userId_type_title: {
              userId: user.id,
              type: p.type,
              title: p.title,
            },
          },
          create: {
            user: { connect: { id: user.id } },
            type: p.type,
            title: p.title,
            value: p.value,
            visible: p.visible,
            isPrimary: p.isPrimary,
          },
          update: {
            // value: p.value, // Do not update exist value.
          },
        });
      }),
    );

    return this.authService.generateUserCredentials(user);
  }

  public async findPrivateProfile(userId: string, includeInternal = false): Promise<ProfileEntry[]> {
    return this.prisma.profileEntry.findMany({
      where: {
        userId,
        internal: false
      }
    });
  }

  public async findPublicProfile(userId: string): Promise<ProfileEntry[]> {
    return this.prisma.profileEntry.findMany({
      where: {
        userId,
        visible: true, // NOTE: For now, this just handles the global profile visibility. Later we also need to deal with active meeting visibilities
        internal: false
      }
    });
  }

  /**
   * When a user tries to get a magic authentication link by email,
   * and this email doesn't exist yet, we create a temporary user.
   * This doesn't mean that the email is valid yet.
   */
  private async createEmailAuthUser(emailAddress: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: { type: "EMAIL" }
    });

    const profileEntries = [
      { type: ProfileType.EMAIL, title: ProfileTitle.OTHER_EMAIL, value: emailAddress, visible: false, isPrimary: true },
      { type: ProfileType.FIRSTNAME, title: ProfileTitle.FIRSTNAME, value: generateRandomTempName("firstname"), visible: true, isPrimary: true },
      { type: ProfileType.LASTNAME, title: ProfileTitle.LASTNAME, value: generateRandomTempName("lastname"), visible: true, isPrimary: true },
    ];

    await this.prisma.profileEntry.createMany({
      data: profileEntries.map((p) => ({
        userId: user.id,
        type: p.type,
        title: p.title,
        value: p.value,
        visible: p.visible,
        isPrimary: p.isPrimary,
      }))
    });

    return user;
  }

  /**
   * Initiates a new authentication by email, using a magic link.
   */
  public async requestEmailAuthentication(emailAddress: string) {
    // Check if a user exists with this authentication mode and email already. If not, create a user.
    let user = await this.prisma.user.findFirst({
      where: {
        ProfileEntries: {
          some: {
            type: ProfileType.EMAIL,
            value: emailAddress
          }
        }
      }
    });

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
    this.emailingService.sendEmail(EmailTemplateType.EMAIL_AUTHENTICATION, "Mingler <email-auth@mingler.io>", emailAddress, "Sign in with your magic link", {
      magicLink
    });

    return null;
  }

  public async findFirstProfileValueByType(userId: string, type: ProfileType): Promise<string> {
    const profiles = await this.findPrivateProfile(userId);
    const profile = profiles.find(p => p.type === type);
    return profile ? profile.value : null;
  }

  /**
   * Checks if the welcome email has been sent for the user and if not,
   * sends it if we have a known email address.
   */
  private async maybeSendWelcomeEmail(user: User, emailAddress: string): Promise<boolean> {
    if (user.welcomeEmailSentAt)
      return false; // Already sent, skip

    const firstName = await this.findFirstProfileValueByType(user.id, ProfileType.FIRSTNAME);
    const loungeUrl = `${process.env.FRONTEND_URL}/lounge`;
    this.emailingService.sendEmail(
        EmailTemplateType.WELCOME,
        "welcome@didservice.io",
        emailAddress,
        "Welcome to DidService.io",
        {
          user: {
            // Use the name only if that's not a temporary name (real user signed in)
            // name: (user.type !== UserType.TEMPORARY && user.type !== UserType.EMAIL) && firstName
            name: user.type !== UserType.EMAIL && firstName
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

    const emailAddress = await this.findFirstProfileValueByType(user.id, ProfileType.EMAIL);
    await this.maybeSendWelcomeEmail(user, emailAddress);

    return this.authService.generateUserCredentials(user);
  }
}
