import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BrowsersService } from './browsers.service';
import { BrowserEntity } from './entities/browser.entity';

@Resolver(() => BrowserEntity)
export class BrowsersResolver {
  constructor(private readonly browsersService: BrowsersService) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [BrowserEntity], { name: 'browsers' })
  findAll(@CurrentUser() user: User) {
    return this.browsersService.findAll(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteBrowser(@Args('browserId') browserId: string, @CurrentUser() user: User) {
    await this.browsersService.deleteBrowser(browserId, user);
    return true;
  }
}
