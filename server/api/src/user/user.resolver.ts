import { UseGuards } from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import {JwtAuthGuard, OptionalJwtAuthGuard} from 'src/auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import {logger} from "../logger";
import {ProfileEntryEntity} from "./entities/profile-entry.entity";
import {User} from "@prisma/client";
import {RequestEmailAuthenticationResult} from "./entities/request-email-authentication-result.entity";
import {LoggedUserOutput} from "./dto/logged-user.output";

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  /**
   * Returns authenticated user's personal profile, including information that
   * is not meant to be public.
   */
  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  getSelfUser(@CurrentUser() user: UserEntity) {
    // Consider that every time a user tries to fetch his own profile, this means he is active / online, so we update this information.
    // Not very efficient CPU wise but can be improved later.
    // this.userService.saveLastSeenNow(user);
    logger.log('enter getSelfUser');
    return user;
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Query(() => [ProfileEntryEntity])
  async userProfile(@CurrentUser() user: User, @Args('userId') userId: string) {
    // If the requested user if the current user, return his full private profile. Otherwise, return his public profile.
    // TODO: MUCH IMPROVEMENT NEEDED FOR VISIBILITY FIELDS ACCORDING TO CONTEXT (MEETING)
    if (user?.id === userId)
      return this.userService.findPrivateProfile(userId);
    else {
      return this.userService.findPublicProfile(userId);
    }
  }

  @Mutation(() => RequestEmailAuthenticationResult, { nullable: true })
  async requestEmailAuthentication(@Args('emailAddress') emailAddress: string) {
    return this.userService.requestEmailAuthentication(emailAddress);
  }

  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkEmailAuthentication(@Args('authKey') authKey: string) {
    return this.userService.checkEmailAuthentication(authKey);
  }
}
