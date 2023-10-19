import { ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserService } from './user.service';

@Injectable()
export class DeveloperAccessKeyGuard {
  constructor(private readonly userService: UserService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const developerAccessKey = request.headers['x-developer-key'];
    if (!developerAccessKey)
      throw new HttpException("Developer access key not provided", 401);

    // Retrieve user (developer) related to this access key
    const developer = await this.userService.validateDeveloperAccessKey(developerAccessKey);
    if (!developer)
      throw new HttpException("Access key not bound to any existing user. Please generate a developer access key from the Mydentity web app", 401);

    request.developer = developer;

    return true;
  }
}