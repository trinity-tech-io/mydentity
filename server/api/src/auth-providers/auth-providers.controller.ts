import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from "../exceptions/app-exception";
import { AuthExceptionCode } from "../exceptions/exception-codes";
import { logger } from "../logger";
import { UserService } from "../user/user.service";
import { MicrosoftProfileService } from "./microsoft-profile.service";

@Controller()
export class AuthProvidersController {
  private static readonly ACTION_BIND = 'bind';
  private static readonly ACTION_LOGIN = 'login';

  constructor(
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
}
