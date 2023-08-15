import { Injectable } from '@nestjs/common';
import { Credential, User } from '@prisma/client';
import { DidService } from 'src/did/did.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialInput } from './dto/create-credential.input';

const fakeCrendentialDeleteMe = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://ns.elastos.org/credentials/v1',
    'https://example.com/credentials/license/v1',
  ],
  issuanceDate: '2021-11-20T09:55:45Z',
  expirationDate: '2026-11-20T09:55:45Z',
  id: '#license',
  type: ['VerifiableCredential', 'LicenseCredential'],
  proof: {
    verificationMethod:
      'did:elastos:imUUPBfrZ1yZx6nWXe6LNN59VeX2E6PPKj#primary',
    created: '2021-11-20T09:55:45Z',
    signature:
      'AI8C1YIPvHmDFOKhiCucurA2YRfLASsv5TF2D-erKEgdoO8eCAaqVX3LW23V8yMZVNuRRMB5nn2r2AfApqft_A',
  },
  issuer: 'did:elastos:example',
  credentialSubject: {
    'license-id': '20201021C889',
    scope: 'Consulting',
    id: 'did:elastos:foobar',
  },
};

@Injectable()
export class CredentialsService {
  constructor(private prisma: PrismaService, private didService: DidService) { }

  async create(input: CreateCredentialInput, user: User) {
    console.log('CredentialsService', "create")
    const storePassword = '123456'; // TODO: use account key

    const vc = await this.didService.createCredential(user.id, input.identityDid, input.credentialId,
          input.types, input.expirationDate, input.properties, storePassword);
    console.log('CredentialsService', "vc:", vc)

    return this.prisma.credential.create({
      data: {
        identityDid: input.identityDid,
        credentialId: vc.id.toString(),
      },
    });
  }

  async findAll(identityDid: string): Promise<Credential[]> {
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    // TODO: for each DB credential, load the real VC from the DID Store and decrypt it.

    return credentials.map((c) => ({
      ...c,
      verifiableCredential: JSON.stringify(fakeCrendentialDeleteMe),
    }));
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

  async deleteCredentialsByIdentity(identityDid: string, user: User) {
    console.log('deleteCredentialsByIdentity', 'identityDid:', identityDid);
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    return Promise.all(credentials.map((c) => (this.remove(c.id, user))));
  }
}
