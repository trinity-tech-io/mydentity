import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client/main';
import { GraphQLError } from "graphql/error";
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HeaderBrowserKey } from 'src/browsers/browser-key-header.decorator';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { UserAgent } from 'src/browsers/user-agent-decorator';
import { AuthKeyInput } from 'src/key-ring/dto/auth-key-input';
import { ActivityService } from "../activity/activity.service";
import { BrowsersService } from "../browsers/browsers.service";
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { LoggedUserOutput } from "./dto/logged-user.output";
import { RefreshTokenInput } from "./dto/refresh-token.input";
import { RefreshTokenOutput } from "./dto/refresh-token.output";
import { SignUpInput } from './dto/sign-up.input';
import { UserPropertyInput } from "./dto/user-property.input";
import { CreatedAccessKeyEntity } from './entities/created-access-token';
import { DeveloperAccessKeyEntity } from './entities/developer-access-token';
import { RequestEmailAuthenticationResult } from './entities/request-email-authentication-result.entity';
import { RequestTemporaryAuthenticationResult } from './entities/request-temporary-authentication-result.entity';
import { UserEmailEntity } from "./entities/user-email.entity";
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService,
    private readonly browsersService: BrowsersService,
    private readonly activityService: ActivityService,
  ) { }

  @Mutation(() => LoggedUserOutput, { nullable: true })
  async signUp(@Args('input') input: SignUpInput, @HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string) {
    if (!input.name || input.name.trim() === '')
      throw new AppException(AuthExceptionCode.AuthError, 'User name must be provided.', 401);

    return this.userService.signUp(input, browserKey, userAgent);
  }

  /**
   * Returns authenticated user's personal profile, including information that
   * is not meant to be public.
   */
  @UseGuards(JwtAuthGuard)
  @Query(() => UserEntity)
  getSelfUser(@CurrentUser() user: User) {
    // Consider that every time a user tries to fetch his own profile, this means he is active / online, so we update this information.
    // Not very efficient CPU wise but can be improved later.
    // this.userService.saveLastSeenNow(user);
    logger.log(`enter getSelfUser`, user);
    return user;
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput, @HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string): Promise<RefreshTokenOutput> {
    try {
      const user = await this.userService.getUserByAccessToken(refreshTokenInput.refreshToken);
      return this.userService.refreshAccessToken(user, browserKey, userAgent);
    } catch (e) {
      throw new GraphQLError("Can't refresh token", {
        extensions: {
          code: this.INVALID_REFRESH_TOKEN,
        },
      });
    }
  }

  /**
   * Initiate a request to receive a magic link by email to bind that email to the currently signed in user.
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RequestEmailAuthenticationResult, { nullable: true })
  async bindWithEmailAddress(@CurrentUser() user: User, @Args('emailAddress') emailAddress: string): Promise<RequestEmailAuthenticationResult> {
    const result = await this.userService.requestRegularEmailBinding(user, emailAddress);
    if (!result)
      return { success: false };
    else
      return { success: true, pinCode: result.pinCode };
  }

  /**
   * Send email with auth key to user's email box, in order to sign in.
   * @param emailAddress
   */
  @Mutation(() => RequestEmailAuthenticationResult, { nullable: true })
  async requestEmailAuthentication(@Args('emailAddress') emailAddress: string): Promise<RequestEmailAuthenticationResult> {
    const result = await this.userService.requestRegularEmailAuthentication(emailAddress);

    if (!result)
      return { success: false };
    else
      return { success: true, pinCode: result.pinCode };
  }

  /**
   * Request a temporary sign in url and pin code, to sign in from a new browser without email for instance.
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => RequestTemporaryAuthenticationResult, { nullable: true })
  async requestTemporaryAuthentication(@CurrentUser() user: User): Promise<RequestTemporaryAuthenticationResult> {
    return this.userService.requestTemporaryAuthentication(user);
  }

  /**
   * Verify a temporary authentication key to sign-in.
   */
  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkTemporaryAuthentication(@Args('authKey') authKey: string, @Args('pinCode') pinCode: string, @HeaderBrowserKey() browserKey: string, @UserAgent() userAgent: string) {
    return this.userService.checkTemporaryAuthentication(authKey, pinCode, browserKey, userAgent);
  }

  /**
   * Bind a new email address (after magic link temporary auth verification) to an existing user account.
   * Only for raw email address (not for oauth).
   */
  @UseGuards(JwtAuthGuard)
  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkEmailBind(@CurrentUser() user: User, @Args('authKey') authKey: string, @Args('pinCode') pinCode: string, @CurrentBrowser() browser: Browser, @UserAgent() userAgent: string) {
    return this.userService.checkEmailBinding(authKey, pinCode, browser?.key, userAgent, user);
  }

  /**
   * Receives the result of a passkey challenge as input, and retrieves the related user (if any).
   * Access tokens are returned as a result of the sign in operation.
   */
  @Query(() => LoggedUserOutput, { nullable: true })
  async signInWithPasskey(@HeaderBrowserKey() headerBrowserKey: string, @UserAgent() userAgent: string, @Args('authKey') passkeyAuthKey: AuthKeyInput) {
    return this.userService.signInWithPasskey(passkeyAuthKey, headerBrowserKey, userAgent);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEmailEntity])
  async fetchUserEmails(@CurrentUser() user: User) {
    return this.userService.listUserEmails(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteUserEmail(@CurrentUser() user: User, @Args('id') id: string) {
    await this.userService.deleteUserEmail(user, id);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async updateUserProperty(@CurrentUser() user: User, @Args('input') input: UserPropertyInput) {
    void this.userService.updateUserProperty(user, input);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedAccessKeyEntity)
  async createDeveloperAccessKey(@CurrentUser() user: User) {
    return this.userService.createAccessKey(user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [DeveloperAccessKeyEntity])
  async developerAccessKeys(@CurrentUser() user: User) {
    return this.userService.getAccessKeys(user);
  }
}
