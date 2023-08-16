import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthProvidersService {
  constructor(private readonly userService: UserService) { }

  login(req) {
    if (!req.user)
      throw new Error('Can not get user information from auth-providers.');

    return this.userService.signInByThirdPartyAuth(req.user);
  }
}
