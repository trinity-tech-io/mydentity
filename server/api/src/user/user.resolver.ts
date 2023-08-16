import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from "@prisma/client";
import { GraphQLError } from "graphql/error";
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard, OptionalJwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { logger } from "../logger";
import { LoggedUserOutput } from "./dto/logged-user.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { RefreshTokenOutput } from "./dto/refresh-token.output";
import { ProfileEntryEntity } from "./entities/profile-entry.entity";
import { RequestEmailAuthenticationResult } from "./entities/request-email-authentication-result.entity";
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { SignUpInput } from './dto/sign-up.input';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Mutation(() => LoggedUserOutput, { nullable: true })
  async signUp(@Args('input') input: SignUpInput) {
    return this.userService.signUp(input);
  }

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

  private async getUserByToken(token: string): Promise<User> {
    const data = this.authService.getTokenPayload(token);
    const user = await this.userService.findOne(data.sub);
    if (!user)
      throw new Error(`Can not find user by refresh token.`);

    return user;
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<RefreshTokenOutput> {
    try {
      const user = await this.getUserByToken(refreshTokenInput.refreshToken);
      return this.userService.refreshAccessToken(user);
    } catch (e) {
      throw new GraphQLError("Can't refresh token", {
        extensions: {
          code: this.INVALID_REFRESH_TOKEN,
        },
      });
    }
  }
}
