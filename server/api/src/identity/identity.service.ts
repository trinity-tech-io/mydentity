import { Injectable } from '@nestjs/common';
import { Identity } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService, private credentialsService: CredentialsService) { }

  async create(createDidInput: CreateIdentityInput): Promise<Identity> {
    const identity = await this.prisma.identity.create({
      data: {
        did: 'did:elastos:' + Math.random()
      }
    })

    // TEMPORARY: create some fake credentials to list on the UI during initial development
    await this.credentialsService.create({ identityDid: identity.did });
    await this.credentialsService.create({ identityDid: identity.did });

    return identity;
  }

  findAll() {
    return this.prisma.identity.findMany({
      where: {
        // TODO: auth user id
      }
    })
  }
}
