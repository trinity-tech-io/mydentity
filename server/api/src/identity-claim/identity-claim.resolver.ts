import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IdentityAccessTokenGuard } from 'src/identity/identity-access-token.guard';
import { IdentityAccess } from 'src/identity/identity-access.decorator';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { IdentityClaimRequestEntity } from './entities/identity-claim-request.entity';
import { IdentityClaimService } from './identity-claim.service';

@Resolver(() => IdentityClaimRequestEntity)
export class IdentityClaimResolver {
  constructor(
    private identityClaimService: IdentityClaimService
  ) { }

  @UseGuards(IdentityAccessTokenGuard)
  @Mutation(() => IdentityClaimRequestEntity)
  async createIdentityClaimRequest(@IdentityAccess() identityAccess: IdentityAccessInfo): Promise<IdentityClaimRequestEntity> {
    const claimRequest = await this.identityClaimService.createClaimRequest(identityAccess);

    return {
      ...claimRequest as any, // Cast as any to allow auto filed conversion by nest
      identityInfo: this.identityClaimService.getClaimableIdentityInfo(claimRequest),
      claimUrl: this.identityClaimService.getClaimUrl(claimRequest.id)
    }
  }

  @Query(() => IdentityClaimRequestEntity, { name: 'identityClaimRequest' })
  async findOne(@Args('id') claimRequestId: string): Promise<IdentityClaimRequestEntity> {
    const claimRequest = await this.identityClaimService.findOne(claimRequestId);
    return {
      ...claimRequest as any, // Cast as any to allow auto filed conversion by nest
      identityInfo: this.identityClaimService.getClaimableIdentityInfo(claimRequest),
      claimUrl: this.identityClaimService.getClaimUrl(claimRequest.id)
    }
  }
}
