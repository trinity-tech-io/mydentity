import {UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GraphQLError} from "graphql/error";
import {CurrentUser} from 'src/auth/currentuser.decorator';
import {JwtAuthGuard} from 'src/auth/jwt-auth.guard';
import {AuthService} from '../auth/auth.service';
import {UserEntity} from './entities/user.entity';
import {UserService} from './user.service';
import {logger} from "../logger";
import {RequestEmailAuthenticationResult} from "./entities/request-email-authentication-result.entity";
import {LoggedUserOutput} from "./dto/logged-user.output";
import {RefreshTokenOutput} from "./dto/refresh-token.output";
import {RefreshTokenInput} from "./dto/refresh-token.input";
import {SignUpInput} from './dto/sign-up.input';
import {UserEmailEntity} from "./entities/user-email.entity";
import {AppException} from "../exceptions/app-exception";
import {AuthExceptionCode} from "../exceptions/exception-codes";
import {UserPropertyInput} from "./dto/user-property.input";

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Mutation(() => LoggedUserOutput, { nullable: true })
  async signUp(@Args('input') input: SignUpInput) {
    if (!input.name || input.name.trim() === '')
      throw new AppException(AuthExceptionCode.AuthError, 'User name must be provided.', 401);

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
  async checkEmailAuthentication(@Args('authKey') authKey: string) {
    return this.userService.checkEmailAuthentication(null, authKey);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => LoggedUserOutput, { nullable: true })
  async checkEmailBind(@CurrentUser() user: UserEntity, @Args('authKey') authKey: string) {
    return this.userService.checkEmailAuthentication(user, authKey);
  }

  @Mutation(() => RefreshTokenOutput)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<RefreshTokenOutput> {
    try {
      const user = await this.userService.getUserByToken(refreshTokenInput.refreshToken);
      return this.userService.refreshAccessToken(user);
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
    await this.userService.bindOauthEmail(user, email);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [UserEmailEntity])
  async listUserEmails(@CurrentUser() user: UserEntity) {
    return await this.userService.listUserEmails(user);
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
