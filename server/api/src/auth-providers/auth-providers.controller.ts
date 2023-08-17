import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { AuthProvidersService } from './auth-providers.service';

@Controller()
export class AuthProvidersController {
  constructor(
    private readonly authProvidersService: AuthProvidersService,
    private readonly configService: ConfigService,
  ) {}

  @Get('microsoft')
  @UseGuards(AuthGuard('microsoft'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  microsoftAuth(@Req() req) {}

  @Get('microsoft/redirect')
  @Redirect('', 301)
  @UseGuards(AuthGuard('microsoft'))
  async microsoftAuthRedirect(@Req() req) {
    return this.getRedirectUrlResponse(req, 'MICROSOFT_CLIENT_REDIRECT');
  }

  private async getRedirectUrlResponse(req, redirect_key) {
    console.log(
      `auth redirect, ${redirect_key}, ${this.configService.get<string>(
        redirect_key,
      )}`,
    );
    const result = await this.authProvidersService.login(req);
    return {
      url: `${this.configService.get<string>(redirect_key)}/?accessToken=${
        result.accessToken
      }&refreshToken=${result.refreshToken}&email=${result.email}`,
    };
  }
}
