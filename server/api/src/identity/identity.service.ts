import { DIDDocument } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { DidService } from '../did/did.service';
import { CreateIdentityInput } from './dto/create-identity.input';

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService,
              private credentialsService: CredentialsService,
              private didService: DidService) {}

  async create(createDidInput: CreateIdentityInput, user: User): Promise<Identity> {
    console.log('IdentityService', 'create', user);
    const storePassword = '123456'; // TODO: use account key

    // Get rootIdentity to new did.
    const rootIdentity = await this.didService.getRootIdentity(user.id, storePassword);
    console.log('IdentityService', 'rootIdentity', rootIdentity);

    const didDocument: DIDDocument = await rootIdentity.newDid(storePassword);

    // One user can create multiple dids, so we save the derivation index.
    const derivationIndex = rootIdentity.getIndex() - 1;
    console.log('IdentityService', 'create did index', derivationIndex);

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
        derivationIndex: derivationIndex,
        user: { connect: { id: user.id } }
      }
    })

    // TEMPORARY: create some fake credentials to list on the UI during initial development
    // await this.credentialsService.create({ identityDid: identity.did });
    // await this.credentialsService.create({ identityDid: identity.did });
    console.log('IdentityService', 'create identity:', identity)
    return identity;
  }

  async deleteDID(didString: string, user: User) {
    console.log('IdentityService', 'deleteDID didString:', didString);
    const didStore = await this.didService.openStore(user.id);
    const ret = didStore.deleteDid(didString);
    if (ret) {
      await this.prisma.identity.delete({
        where: {
          did: didString
        }
      })
    }
    return ret;
  }

  findAll(user: User) {
    console.log('IdentityService', 'findAll user', user);
    return this.prisma.identity.findMany({
      where: {
        userId: user.id
      }
    })
  }
}
