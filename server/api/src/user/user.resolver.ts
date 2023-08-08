import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => UserEntity)
export class UserResolver {
  private readonly INVALID_REFRESH_TOKEN = 'INVALID_REFRESH_TOKEN';

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

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

    return user;
  }
}
