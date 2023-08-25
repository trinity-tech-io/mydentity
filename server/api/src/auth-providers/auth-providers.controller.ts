import {Controller, Get, Redirect, Req, UseGuards} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {AuthGuard} from '@nestjs/passport';
import {AuthProvidersService} from './auth-providers.service';
import {AppException} from "../exceptions/app-exception";
import {AuthExceptionCode} from "../exceptions/exception-codes";
import {MicrosoftProfileService} from "../user/microsoft-profile.service";
import {UserService} from "../user/user.service";

@Controller()
export class AuthProvidersController {
  private static readonly ACTION_BIND = 'bind';
  private static readonly ACTION_LOGIN = 'login';

  constructor(
    private readonly authProvidersService: AuthProvidersService,
    private readonly configService: ConfigService,
    private readonly microsoftProfileService: MicrosoftProfileService,
    private readonly userService: UserService
  ) {}

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  microsoftAuth(@Req() req) {}

  @Get('microsoft/redirect')
  @Redirect('', 301)
  async microsoftAuthRedirect(@Req() req) {
    const token = req.query.token;
    const action = req.query.action;
    const accessToken = req.query.accessToken;

    if (!token) {
      throw new AppException(AuthExceptionCode.AuthError, `token(${token}) must provided for microsoft redirect`, 401);
    }
    if (!action || ![AuthProvidersController.ACTION_BIND, AuthProvidersController.ACTION_LOGIN].includes(action)) {
      throw new AppException(AuthExceptionCode.AuthError, `invalid action(${action})`, 401);
    } else if (action === AuthProvidersController.ACTION_BIND && !accessToken) {
      throw new AppException(AuthExceptionCode.AuthError, `must provide access token for bind`, 401);
    }

    const email = await this.microsoftProfileService.retrieveEmail(token);
    if (action === 'login') {
      const result = await this.userService.signInByEmail(email);
      if (!result) {
        throw new AppException(AuthExceptionCode.AuthError, `can not login as user not exists`, 401);
      }
      return {
        url: `${this.configService.get<string>('MICROSOFT_CLIENT_REDIRECT')}?accessToken=${
            result.accessToken
        }&refreshToken=${result.refreshToken}&action=${action}`
      };
    } else { // bind
      const user = await this.userService.getUserByToken(accessToken);
      // const user: UserEntity = await this.userService.getUserByEmail(email);
      if (!user) {
        throw new AppException(AuthExceptionCode.AuthError, `can not find user by access token`, 401);
      }
      await this.userService.bindOauthEmail(user, email);
      return {
        url: `${this.configService.get<string>('MICROSOFT_CLIENT_REDIRECT')}?action=${action}`
      }
    }
  }
}
