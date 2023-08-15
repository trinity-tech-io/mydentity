import { Injectable } from '@nestjs/common';
import { Credential } from '@prisma/client';
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
  constructor(private prisma: PrismaService) { }

  create(input: CreateCredentialInput) {
    console.log('CredentialsService', "create")
    return this.prisma.credential.create({
      data: {
        identityDid: input.identityDid,
        credentialId: `${Math.random()}`,
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

  async remove(id: string) {
    return await this.prisma.credential.delete({
      where: {
        id
      }
    })
  }

  async deleteCredentialsByIdentity(identityDid: string) {
    console.log('deleteCredentialsByIdentity', 'identityDid:', identityDid);
    const credentials = await this.prisma.credential.findMany({
      where: { identityDid },
    });

    return Promise.all(credentials.map((c) => (this.remove(c.id))));
  }
}
