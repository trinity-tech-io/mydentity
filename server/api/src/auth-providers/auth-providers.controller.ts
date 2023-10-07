import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthProvidersController {
  /**
   * Start oauth from server.
   * @param req
   */
  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  microsoftAuth(@Req() req) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(@Req() req) { }

  @Get('linkedin')
  @UseGuards(AuthGuard('linkedin'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  linkedinAuth(@Req() req) { }
}
