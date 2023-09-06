import { VerifiableCredential } from '@elastosfoundation/did-js-sdk';
import { Injectable, Logger } from '@nestjs/common';
import { Credential, User } from '@prisma/client';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode } from 'src/exceptions/exception-codes';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialInput } from './dto/create-credential.input';
import { CreateVerifiablePresentationInput } from './dto/create-verifiablePresentation.input';
import { ImportCredentialInput } from './dto/import-credential.input';
import { IssueCredentialInput } from './dto/issue-credential.input';

@Injectable()
export class CredentialsService {
  private logger: Logger = new Logger("CredentialsService");

  constructor(private prisma: PrismaService, private didService: DidService) {
  }

  async create(input: CreateCredentialInput, user: User) {
    this.logger.log("create")
    const storePassword = '123456'; // TODO: use account key

    const vc = await this.didService.createCredential(user.id, input.identityDid, input.credentialId,
      input.types, input.expirationDate, input.properties, storePassword);

    const credentials = await this.prisma.credential.create({
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

  async storeCredential(input: ImportCredentialInput, user: User) {
    const vc = VerifiableCredential.parse(input.credentialString);
    this.logger.log("storeCredential")
    await this.didService.storeCredential(user.id, vc);

    const credentials = await this.prisma.credential.create({
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

  async issueCredential(input: IssueCredentialInput, user: User) {
    this.logger.log("issueCredential")
    const storePassword = '123456'; // TODO: use account key

    const vc = await this.didService.issueCredential(user.id, input.identityDid, input.subjectDid, input.credentialId,
      input.types, input.expirationDate, input.properties, storePassword);
    return {
      verifiableCredential: vc.toString(),
    };
  }

  async findAll(identityDid: string, user: User): Promise<Credential[]> {
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
    this.logger.log('deleteCredentialsByIdentity identityDid:' + identityDid);
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
    this.logger.log("createVerifiablePresentation")
    const storePassword = '123456'; // TODO: use account key

    const credentials = [];
    input.credentials.forEach(c => {
      credentials.push(VerifiableCredential.parse(c))
    })
    const vp = await this.didService.createVerifiablePresentationFromCredentials(user.id, input.identityDid, credentials,
      input.nonce, input.realm, storePassword);
    return {
      verifiablePresentation: vp.toString(),
    }
  }

  /**
  * Ensures that the credentialId credential is owned by user and returns the credential.
  * If not, throws an exception.
  */
  public async ensureOwnedCredential(credentialId: string, user: User): Promise<Credential> {
    const credential = await this.prisma.credential.findFirst({
      where: {
        credentialId,
        identity: {
          userId: user.id
        }
      }
    })
    if (!credential)
      throw new AppException(AuthExceptionCode.CredenialNotOwned, `You are not owner of credential ${credentialId}`, 401);

    return credential;
  }
}
