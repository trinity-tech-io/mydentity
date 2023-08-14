import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateIdentityInput } from './dto/create-identity.input';
import { IdentityEntity } from './entities/identity.entity';
import { IdentityService } from './identity.service';

@Resolver(() => IdentityEntity)
export class IdentityResolver {
  constructor(private readonly didService: IdentityService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  createIdentity(@Args('input') createIdentityInput: CreateIdentityInput, @CurrentUser() user: User) {
    return this.didService.create(createIdentityInput, user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  deleteIdentity(@Args('didString') didString: string, @CurrentUser() user: User) {
    return this.didService.deleteIdentity(didString, user);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityEntity], { name: 'identities' })
  findAll(@CurrentUser() user: User) {
    return this.didService.findAll(user);
  }
}
