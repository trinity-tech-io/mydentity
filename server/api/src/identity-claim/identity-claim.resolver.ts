import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IdentityEntity } from 'src/identity/entities/identity.entity';
import { IdentityAccessTokenGuard } from 'src/identity/identity-access-token.guard';
import { IdentityAccess } from 'src/identity/identity-access.decorator';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { ClaimIdentityInput } from './dto/claim-identity.input';
import { IdentityClaimRequestEntity } from './entities/identity-claim-request.entity';
import { IdentityClaimService } from './identity-claim.service';
import { CurrentBrowser } from 'src/browsers/browser-user.decorator';
import { CurrentUser } from 'src/auth/currentuser.decorator';
import { Browser, User } from '@prisma/client/main';

@Resolver(() => IdentityClaimRequestEntity)
export class IdentityClaimResolver {
  constructor(
    private identityClaimService: IdentityClaimService
  ) { }

  @UseGuards(IdentityAccessTokenGuard)
  @Mutation(() => IdentityClaimRequestEntity)
  async createIdentityClaimRequest(@IdentityAccess() identityAccess: IdentityAccessInfo): Promise<IdentityClaimRequestEntity> {
    const {claimRequest, claimURL} = await this.identityClaimService.createClaimRequest(identityAccess);

    return {
      ...claimRequest as any, // Cast as any to allow auto filed conversion by nest
      identityInfo: this.identityClaimService.getClaimableIdentityInfo(claimRequest),
      claimUrl: claimURL
    }
  }

  @Query(() => IdentityClaimRequestEntity, { name: 'identityClaimRequest' })
  async verifyClaimRequest(@Args('id') claimRequestId: string, @Args('nonce') nonce: string): Promise<IdentityClaimRequestEntity> {
    const claimRequest = await this.identityClaimService.verifyClaimRequest(claimRequestId, nonce);
    return {
      ...claimRequest as any, // Cast as any to allow auto filed conversion by nest
      identityInfo: this.identityClaimService.getClaimableIdentityInfo(claimRequest)
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  async claimManagedIdentity(@Args("input") input: ClaimIdentityInput, @CurrentBrowser() browser: Browser, @CurrentUser() user: User): Promise<IdentityEntity> {
    const identity = this.identityClaimService.claimManagedIdentity(input.requestId, input.nonce, input.newPassword, browser.id, user);
    return identity as any;
  }
}
