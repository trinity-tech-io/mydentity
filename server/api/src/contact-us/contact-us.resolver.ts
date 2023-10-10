import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client/main';
import { CurrentUser } from "../auth/currentuser.decorator";
import { ContactUsService } from "./contact-us.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Resolver(() => Boolean)
export class ContactUsResolver {
  constructor(private contactUsService: ContactUsService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  submitContactUs(@CurrentUser() user: User, @Args('message') message: string) {
    return this.contactUsService.submitContactUs(message, user);
  }
}