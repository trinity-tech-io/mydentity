import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { UserService } from "../user/user.service";
import { AuthProvidersService } from './auth-providers.service';
import { MicrosoftProfileService } from "./microsoft-profile.service";

@Controller()
export class AuthProvidersController {
  private static readonly ACTION_BIND = 'bind';
  private static readonly ACTION_LOGIN = 'login';

  constructor(
    private readonly authProvidersService: AuthProvidersService,
    private readonly configService: ConfigService,
    private readonly microsoftProfileService: MicrosoftProfileService,
    private readonly userService: UserService
  ) { }

  /**
   * Start oauth from server.
   * @param req
   */
  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  microsoftAuth(@Req() req) { }

  /**
   * Callback from MS. Second step is to client.
   * @param req
   */
  @Get('microsoft/redirect')
  @Redirect('', 301)
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuthRedirect(@Req() req) {
    const redirectUrl = this.configService.get<string>('MICROSOFT_CLIENT_CALLBACK_URL');

    logger.log(`auth redirect, ${redirectUrl}`);

    const token = req.user.accessToken;
    return {
      url: `${redirectUrl}?token=${token}`
    }
  }

  /**
   * Callback from client, this is the third step of MS callback.
   * @param req
   */
  @Get('microsoft/redirectBack')
  @Redirect('', 301)
  async microsoftAuthRedirectBack(@Req() req) {
    const token = req.query.token;
    const action = req.query.action;
    const accessToken = req.query.accessToken;

    logger.log(`enter microsoft/redirectBack, token=${token}, action=${action}, accessToken=${accessToken}`);

    if (!token) {
      throw new AppException(AuthExceptionCode.AuthError, `token(${token}) must provided for microsoft redirect`, 401);
    }

    if (!action || ![AuthProvidersController.ACTION_BIND, AuthProvidersController.ACTION_LOGIN].includes(action)) {
      throw new AppException(AuthExceptionCode.AuthError, `invalid action(${action})`, 401);
    } else if (action === AuthProvidersController.ACTION_BIND && !accessToken) {
      throw new AppException(AuthExceptionCode.AuthError, `must provide access token for bind`, 401);
    }

    const email = await this.microsoftProfileService.retrieveEmail(token);
    const url = `${this.configService.get<string>('MICROSOFT_CLIENT_REDIRECT')}?action=${action}`;
    if (action === 'login') {
      const result = await this.userService.signInByEmail(email);
      if (!result) {
        return {
          url: `${url}&error=emailNotExists`
        }
      }

      logger.log(`sign-in with oauth email successfully, it will go back to client ${url}`);

      return { url: `${url}&accessToken=${result.accessToken}&refreshToken=${result.refreshToken}` };
    } else { // bind
      const user = await this.userService.getUserByToken(accessToken);
      if (!user) {
        throw new AppException(AuthExceptionCode.AuthError, `can not find user by access token`, 401);
      }

      const resultUser = await this.userService.bindOauthEmail(user, email);
      if (!resultUser) {
        return {
          url: `${url}&error=emailAlreadyExists`
        }
      }

      logger.log(`bind with oauth email successfully, it will go back to client`);

      return { url }
    }
  }
}
