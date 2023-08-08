import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ThirdPartyUser } from './dto/third-party-user';
import { MicrosoftProfileService } from './microsoft-profile.service';
import { ProfileTitle } from './profile-title';
import { ProfileType } from './profile-type';
import { User } from '@prisma/client';

// https://makinhs.medium.com/authentication-made-easy-with-nestjs-part-4-of-how-to-build-a-graphql-mongodb-d6057eae3fdf
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private readonly microsoftProfileService: MicrosoftProfileService,
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
}
