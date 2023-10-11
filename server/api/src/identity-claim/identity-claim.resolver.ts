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
  async findOne(@Args('id') claimRequestId: string): Promise<IdentityClaimRequestEntity> {
    const claimRequest = await this.identityClaimService.findOne(claimRequestId);
    return {
      ...claimRequest as any, // Cast as any to allow auto filed conversion by nest
      identityInfo: this.identityClaimService.getClaimableIdentityInfo(claimRequest),
    }
  }

  @Query(() => IdentityClaimRequestEntity, { name: 'identityClaimRequest' })
  async verifyClaimRequest(@Args('id') claimRequestId: string, @Args('nonce') nonce: string): Promise<boolean> {
    return this.identityClaimService.verifyClaimRequest(claimRequestId, nonce);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => IdentityEntity)
  async claimManagedIdentity(@Args("input") input: ClaimIdentityInput): Promise<IdentityEntity> {
    return this.identityClaimService.claimManagedIdentity(input.requestId, input.nonce, input.newPassword);
  }
}
