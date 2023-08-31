import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser } from '@prisma/client';
import { GraphQLError } from "graphql/error";
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HeaderBrowserId } from 'src/browsers/browser-id-header.decorator';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { UserAgent } from 'src/browsers/user-agent-decorator';
import { AuthKeyInput } from 'src/key-ring/dto/auth-key-input';
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { LoggedUserOutput } from "./dto/logged-user.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { RefreshTokenOutput } from "./dto/refresh-token.output";
import { SignUpInput } from './dto/sign-up.input';
import { UserPropertyInput } from "./dto/user-property.input";
import { RequestEmailAuthenticationResult } from "./entities/request-email-authentication-result.entity";
import { UserEmailEntity } from "./entities/user-email.entity";
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService
  ) { }

  @Mutation(() => LoggedUserOutput, { nullable: true })
  async signUp(@Args('input') input: SignUpInput, @CurrentBrowser() browser: Browser, @UserAgent() userAgent: string) {
    if (!input.name || input.name.trim() === '')
      throw new AppException(AuthExceptionCode.AuthError, 'User name must be provided.', 401);

    return this.userService.signUp(input, browser?.id, userAgent);
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
    logger.log(`enter getSelfUser`, user);
    return user;
  }

  /**
   * Send email with auth key to user's email box.
   * @param emailAddress
   */
  @Mutation(() => RequestEmailAuthenticationResult, { nullable: true })
  async requestEmailAuthentication(@Args('emailAddress') emailAddress: string) {
    return this.userService.requestEmailAuthentication(null, emailAddress);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RequestEmailAuthenticationResult, { nullable: true })
  async bindWithEmailAddress(@CurrentUser() user: UserEntity, @Args('emailAddress') emailAddress: string) {
    return this.userService.requestEmailAuthentication(user, emailAddress);
  }

  /**
   * verify email auth key to sign-in.
   * @param authKey
   */
  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkEmailAuthentication(@Args('authKey') authKey: string, @CurrentBrowser() browser: Browser, @UserAgent() userAgent: string) {
    return this.userService.checkEmailAuthentication(null, authKey, browser?.id, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkEmailBind(@CurrentUser() user: UserEntity, @Args('authKey') authKey: string, @CurrentBrowser() browser: Browser, @UserAgent() userAgent: string) {
    return this.userService.checkEmailAuthentication(user, authKey, browser?.id, userAgent);
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput, @CurrentBrowser() browser: Browser, @UserAgent() userAgent: string): Promise<RefreshTokenOutput> {
    try {
      console.log("refresh token browser", browser)
      const user = await this.userService.getUserByToken(refreshTokenInput.refreshToken);
      return this.userService.refreshAccessToken(user, browser?.id, userAgent);
    } catch (e) {
      throw new GraphQLError("Can't refresh token", {
        extensions: {
          code: this.INVALID_REFRESH_TOKEN,
        },
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean, { nullable: true })
  async bindOauthEmail(@CurrentUser() user: UserEntity, @Args('email') email: string) {
    const resultUser = await this.userService.bindOauthEmail(user, email);
    if (!resultUser) {
      throw new AppException(AuthExceptionCode.EmailAlreadyExists, `Email ${email} already belongs to other user.`, 401);
    }
    return true;
  }

  /**
   * Receives the result of a passkey challenge as input, and retrieves the related user (if any).
   * Access tokens are returned as a result of the sign in operation.
   */
  @Query(() => LoggedUserOutput, { nullable: true })
  async signInWithPasskey(@HeaderBrowserId() headerBrowserId: string, @UserAgent() userAgent: string, @Args('authKey') passkeyAuthKey: AuthKeyInput) {
    return this.userService.signInWithPasskey(passkeyAuthKey, headerBrowserId, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEmailEntity])
  async fetchUserEmails(@CurrentUser() user: UserEntity) {
    return this.userService.listUserEmails(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteUserEmail(@CurrentUser() user: UserEntity, @Args('email') email: string) {
    await this.userService.deleteUserEmail(user, email);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateUserProperty(@CurrentUser() user: UserEntity, @Args('input') input: UserPropertyInput) {
    void this.userService.updateUserProperty(user, input);
    return true;
  }
}
