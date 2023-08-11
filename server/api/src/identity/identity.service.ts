import { DIDDocument } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DidService } from './did/did.service';
import { CreateIdentityInput } from './dto/create-identity.input';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService,
              private credentialsService: CredentialsService,
              private didService: DidService) { }

  async create(createDidInput: CreateIdentityInput, user: User): Promise<Identity> {
    console.log('IdentityService', 'create', user)
    let storePassword = '123456'; // TODO: use account key

    // Get rootIdentity
    let rootIdentity = await this.didService.getRootIdentity(user.id, storePassword);

    // Create DID SDK DID
    let index = rootIdentity.getIndex();
    let didDocument: DIDDocument = await rootIdentity.newDid(storePassword, index);

    const identityRoot = await this.prisma.identityRoot.create({
      data: {
        user: { connect: { id: user.id } },
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    const identity = await this.prisma.identity.create({
      data: {
        did: didDocument.getSubject().toString(),
        identityRoot: { connect: { id: identityRoot.id } },
        derivationIndex: index,
        user: { connect: { id: user.id } }
      }
    })

    // TEMPORARY: create some fake credentials to list on the UI during initial development
    // await this.credentialsService.create({ identityDid: identity.did });
    // await this.credentialsService.create({ identityDid: identity.did });
    console.log('IdentityService', 'create identity:', identity)
    return identity;
  }

  deleteDID(user: User) {

  }

  findAll() {
    console.log('IdentityService', 'findAll')
    return this.prisma.identity.findMany({
      where: {
        // TODO: auth user id
      }
    })
  }
}
