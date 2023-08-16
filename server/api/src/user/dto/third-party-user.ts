import { UserType } from '@prisma/client';

export type ThirdPartyUser = {
  userType: UserType,
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
  accessToken: string;
}