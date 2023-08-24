import { DIDDocument, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Injectable } from '@nestjs/common';
import { Identity, User } from '@prisma/client';
import { CredentialsService } from 'src/credentials/credentials.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { DIDExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateIdentityInput } from './dto/create-identity.input';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require('moment');

@Injectable()
export class IdentityService {
  constructor(private prisma: PrismaService,
    private credentialsService: CredentialsService,
    private didService: DidService) { }

  async create(createIdentityInput: CreateIdentityInput, user: User): Promise<Identity> {
    console.log('IdentityService', 'create', user);
    const storePassword = '123456'; // TODO: use account key

    let rootIdentity: RootIdentity = null;
    let didDocument: DIDDocument = null;

    try {
      // Get rootIdentity to new did.
      rootIdentity = await this.didService.getRootIdentity(user.id, storePassword);

      didDocument = await rootIdentity.newDid(storePassword);
    } catch (e) {
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

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
    const createCredentialInput = {
      identityDid: identity.did,
      credentialId: '#name',
      types: ["https://ns.elastos.org/credentials/v1#SelfProclaimedCredential", "https://ns.elastos.org/credentials/profile/name/v1#NameCredential"],
      expirationDate: moment().add(5, 'year').toDate(),
      properties: {
        "name": createIdentityInput.name
      }
    }
    await this.credentialsService.create(createCredentialInput, user);
    console.log('IdentityService', 'create identity:', identity)
    return identity;
  }

  async deleteIdentity(didString: string, user: User) {
    console.log('IdentityService', 'deleteIdentity didString:', didString);
    const successfulDeletion = await this.didService.deleteIdentity(didString, user.id);
    if (successfulDeletion) {
      await this.credentialsService.deleteCredentialsByIdentity(didString);

      await this.prisma.identity.delete({
        where: {
          did: didString
        }
      })
    } else {
      console.log('IdentityService', 'deleteIdentity error');
    }
    return successfulDeletion;
  }

  async createDIDPublishTransaction(didString: string, user: User) {
    console.log('IdentityService', "createDIDPublishTransaction", didString)
    const storePassword = '123456'; // TODO: use account key

    const payload = await this.didService.createDIDPublishTransaction(user.id, didString, storePassword);
    return {
      payload: payload.toString(),
    }
  }

  findAll(user: User) {
    return this.prisma.identity.findMany({
      where: {
        userId: user.id
      }
    })
  }
}
