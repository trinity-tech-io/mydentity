import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BrowsersService } from './browsers.service';
import { Browser } from './entities/browser.entity';

@Resolver(() => Browser)
export class BrowsersResolver {
  constructor(private readonly browsersService: BrowsersService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Browser], { name: 'browsers' })
  findAll(@CurrentUser() user: User) {
    return this.browsersService.findAll(user);
  }
}
