import { Injectable } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService, private credentialsService: CredentialsService) { }

  async create(createDidInput: CreateIdentityInput, user: User): Promise<Identity> {
    const identityRoot = await this.prisma.identityRoot.create({
      data: {
        user: { connect: { id: user.id } },
        didStoreRootIdentityId: "todo"
      }
    });

    const identity = await this.prisma.identity.create({
      data: {
        did: 'did:elastos:' + Math.random(),
        identityRoot: { connect: { id: identityRoot.id } },
        derivationIndex: -1,
        user: { connect: { id: user.id } }
      }
    })

    // TODO: create DID store when user is created
    // TODO: create DID SDK root identity and map inside "identityRoot"
    // TODO: create DID SDK DID and map to "identity"

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
