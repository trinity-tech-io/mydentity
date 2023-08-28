import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { Injectable } from '@nestjs/common';
import { Credential, User } from '@prisma/client';
import { DidService } from 'src/did/did.service';
import { logger } from 'src/logger';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService, private didService: DidService) { }

  async create(input: CreateCredentialInput, user: User) {
    logger.log('CredentialsService', "create", input)
    const storePassword = '123456'; // TODO: use account key

    const vc = await this.didService.createCredential(user.id, input.identityDid, input.credentialId,
          input.types, input.expirationDate, input.properties, storePassword);

    const credentials= await this.prisma.credential.create({
      data: {
        identityDid: input.identityDid,
        credentialId: vc.id.toString(),
      },
    });
    return {
      ...credentials,
      verifiableCredential: vc.toString(),
    };
  }

  async findAll(identityDid: string, user: User): Promise<Credential[]> {
    // logger.log('CredentialsService', 'findAll identityDid', identityDid)
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    // TODO: for each DB credential, load the real VC from the DID Store and decrypt it.
    return Promise.all(credentials.map(async (c) => ({
      ...c,
      verifiableCredential: (await this.didService.loadCredential(user.id, c.credentialId)).toString(),
    })));
  }

  async remove(credentialId: string, user: User) {
    const successfulDeletion = await this.didService.deleteCredential(user.id, credentialId);
    if (successfulDeletion) {
      await this.prisma.credential.deleteMany({
        where: {
          credentialId: credentialId,
        }
      })
    }

    return successfulDeletion;
  }

  async deleteCredentialsByIdentity(identityDid: string) {
    logger.log('CredentialsService', 'deleteCredentialsByIdentity identityDid:', identityDid);
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    return Promise.all(credentials.map(async (c) => (
      await this.prisma.credential.deleteMany({
      where: {
        credentialId: c.credentialId,
      }
    }))));
  }

  async createVerifiablePresentation(input: CreateVerifiablePresentationInput, user: User) {
    logger.log('CredentialsService', "createVerifiablePresentation", input)
    const storePassword = '123456'; // TODO: use account key

    const credentials = [];
    input.credentials.forEach( c => {
      credentials.push(VerifiableCredential.parse(c))
    })
    const vp = await this.didService.createVerifiablePresentationFromCredentials(user.id, input.identityDid, credentials,
          input.nonce, input.realm, storePassword);
    return {
      verifiablePresentation: vp.toString(),
    }
  }
}
