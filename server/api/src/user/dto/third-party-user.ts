import { UserType } from '@prisma/client';
import { ProfileTitle } from '../profile-title';

export type ThirdPartyUser = {
  userType: UserType,
  userProfileTitle: ProfileTitle.LINKEDIN,
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  accessToken: string;
}