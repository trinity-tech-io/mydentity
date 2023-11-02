import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Browser, User } from '@prisma/client/main';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { MnemonicEntity } from 'src/identity/entities/mnemonic.entity';
import { IdentityRootEntity } from './entities/identity-root.entity';
import { IdentityRootService } from './identity-root.service';

@Resolver(() => IdentityRootEntity)
export class IdentityRootResolver {
  constructor(
    private identityRootService: IdentityRootService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Query(() => [IdentityRootEntity])
  async refreshIdentityRoots(@CurrentUser() user: User) {
    return this.identityRootService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => MnemonicEntity)
  async exportMnemonic(@Args('identityRootId') identityRootId: string, @CurrentUser() user: User, @CurrentBrowser() browser: Browser): Promise<MnemonicEntity> {
    const identityRoot = await this.identityRootService.ensureOwnedIdentityRoot(identityRootId, user);
    return await this.identityRootService.exportMnemonic(identityRoot.userId, identityRoot.didStoreRootIdentityId, user, browser);
  }
}
