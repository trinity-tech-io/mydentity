import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IdentityAccessInfo } from 'src/identity/model/identity-access-info';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdentityClaimService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService
  ) { }

  /**
   * From an identity access token received by an application after creating a managed identity,
   * create a claim request that a target user can use through a url in order to acquire ownership
   * on the identity.
   */
  async createClaimRequest(accessInfo: IdentityAccessInfo) {
    const claimRequest = await this.prisma.identityClaimRequest.create({
      data: {
        identityDid: accessInfo.identity.did
      },
      include: {
        identity: true
      }
    });

    return claimRequest;
  }

  findOne(id: string) {
    return this.prisma.identityClaimRequest.findFirst({
      where: { id },
      include: {
        identity: true
      }
    });
  }

  /**
   * Returns the claim url to be used by end users for to reach
   * the claim identity page.
   */
  public getClaimUrl(claimRequestId: string): string {
    return this.config.getOrThrow("FRONTEND_URL") + `/claim-identity?request=${encodeURIComponent(claimRequestId)}`;
  }
}
