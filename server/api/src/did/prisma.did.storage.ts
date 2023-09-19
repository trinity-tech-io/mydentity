import { CredentialMetadata, DID, DIDDocument, DIDMetadata, DIDStorage, DIDStoreMetadata, DIDURL, ReEncryptor, RootIdentity } from '@elastosfoundation/did-js-sdk';
import { DIDPrismaService } from '../prisma/did.prisma.service';

export class PrismaDIDStorage implements DIDStorage {
  private prisma: DIDPrismaService;

  // NOTE: one new storage instance is created every time we do DID operations.
  constructor(private path: string) {
    this.prisma = DIDPrismaService.getInstance(); // Dirty way to access the singleton. It must have been initialized by someone else first.
  }

  async init(): Promise<void> {
    await this.prisma.storeMetadata.upsert({
      where: { path: this.path },
      update: {},
      create: {
        path: this.path
      }
    });
  }

  getLocation(): string {
    return null;
  }

  async storeMetadata(metadata: DIDStoreMetadata): Promise<void> {
    if (metadata == null || metadata.isEmpty())
      await this.prisma.storeMetadata.deleteMany({});
    else {
      await this.prisma.storeMetadata.upsert({
        where: { path: this.path, },
        update: {
          fingerprint: metadata.getFingerprint() || null,
          defaultRootIndentity: metadata.getDefaultRootIdentity() || null
        },
        create: {
          path: this.path,
          fingerprint: metadata.getFingerprint() || null,
          defaultRootIndentity: metadata.getDefaultRootIdentity() || null
        }
      });
    }
  }

  async loadMetadata(): Promise<DIDStoreMetadata> {
    const result = await this.prisma.storeMetadata.findUnique({
      where: { path: this.path, }
    });

    const metadata = new DIDStoreMetadata();
    if (result.fingerprint)
      metadata.setFingerprint(result.fingerprint);
    if (result.defaultRootIndentity)
      metadata.setDefaultRootIdentity(result.defaultRootIndentity);

    return metadata;
  }

  async storeRootIdentityMetadata(id: string, metadata: RootIdentity.Metadata): Promise<void> {
    await this.prisma.rootIdentity.update({
      where: {
        path: this.path,
        id: id
      },
      data: {
        defaultDid: metadata.getDefaultDid().toString() || null,
      },
    });
  }

  async loadRootIdentityMetadata(id: string): Promise<RootIdentity.Metadata> {
    const result = await this.prisma.rootIdentity.findUnique({
      where: {
        path: this.path,
        id: id
      },
    });

    const metadata = new RootIdentity.Metadata(id);
    if (result.defaultDid) {
      const did = DID.from(result.defaultDid);
      metadata.setDefaultDid(did);
    }

    return metadata;
  }

  async storeRootIdentity(id: string, mnemonic: string, privateKey: string, publicKey: string, index: number): Promise<void> {
    await this.prisma.rootIdentity.create({
      data: {
        path: this.path,
        id: id,
        mnemonic: mnemonic || null,
        privateKey: privateKey || null,
        publicKey: publicKey || null,
        index: index,
      }
    });
  }

  async loadRootIdentity(rid: string): Promise<RootIdentity> {
    const result = await this.prisma.rootIdentity.findUnique({
      where: {
        path: this.path,
        id: rid
      },
      select: {
        publicKey: true,
        index: true,
      }
    });

    return RootIdentity.createFromPreDerivedPublicKey(result.publicKey, result.index);
  }

  async containsRootIdentity(rid: string): Promise<boolean> {
    const result = await this.prisma.rootIdentity.findUnique({
      where: {
        path: this.path,
        id: rid
      },
    });

    return result != null;
  }

  async updateRootIdentityIndex(rid: string, index: number): Promise<void> {
    await this.prisma.rootIdentity.update({
      where: {
        path: this.path,
        id: rid,
      },
      data: {
        index: index,
      }
    });
  }

  async loadRootIdentityPrivateKey(id: string): Promise<string> {
    const result = await this.prisma.rootIdentity.findUnique({
      where: {
        path: this.path,
        id: id
      },
      select: {
        privateKey: true,
      }
    });
    return result.privateKey;
  }

  async loadRootIdentityMnemonic(id: string): Promise<string> {
    const result = await this.prisma.rootIdentity.findUnique({
      where: {
        path: this.path,
        id: id
      },
      select: {
        mnemonic: true,
      }
    });
    return result.mnemonic;
  }

  async deleteRootIdentity(id: string): Promise<boolean> {
    try {
      await this.prisma.rootIdentity.delete({
        where: {
          path: this.path,
          id: id
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async listRootIdentities(): Promise<RootIdentity[]> {
    const result = await this.prisma.rootIdentity.findMany({
      where: { path: this.path, },
      select: {
        publicKey: true,
        index: true,
      }
    });

    const identities: RootIdentity[] = [];
    for (const identity of result)
      identities.push(RootIdentity.createFromPreDerivedPublicKey(identity.publicKey, identity.index));

    return identities;
  }

  async containsRootIdenities(): Promise<boolean> {
    const result = await this.prisma.rootIdentity.count({
      where: { path: this.path },
    });
    return result != 0;
  }

  async storeDidMetadata(did: DID, metadata: DIDMetadata): Promise<void> {
    await this.prisma.didDocument.upsert({
      where: {
        path: this.path,
        did: did.toString(),
      },
      update: {
        index: metadata.getIndex() || null,
        rootIdentityId: metadata.getRootIdentityId() || null,
        txid: metadata.getTransactionId() || null,
        previousSignature: metadata.getPreviousSignature() || null,
        signature: metadata.getSignature() || null,
        published: metadata.getPublished() || null,
        deactivated: metadata.isDeactivated() || null,
        alias: metadata.getAlias() || null,
      },
      create: {
        path: this.path,
        did: did.toString(),
        index: metadata.getIndex() || null,
        rootIdentityId: metadata.getRootIdentityId() || null,
        txid: metadata.getTransactionId() || null,
        previousSignature: metadata.getPreviousSignature() || null,
        signature: metadata.getSignature() || null,
        published: metadata.getPublished() || null,
        deactivated: metadata.isDeactivated() || null,
        alias: metadata.getAlias() || null,
      }
    });
  }

  async loadDidMetadata(did: DID): Promise<DIDMetadata> {
    const result = await this.prisma.didDocument.findUnique({
      where: {
        path: this.path,
        did: did.toString()
      },
      select: {
        rootIdentityId: true,
        index: true,
        txid: true,
        previousSignature: true,
        signature: true,
        published: true,
        deactivated: true,
        alias: true,
      }
    });

    if (!result)
      return null;

    const metadata = new DIDMetadata(did);
    metadata.setRootIdentityId(result.rootIdentityId);
    metadata.setIndex(result.index);
    if (result.txid)
      metadata.setTransactionId(result.txid);
    if (result.previousSignature)
      metadata.setPreviousSignature(result.previousSignature);
    if (result.signature)
      metadata.setSignature(result.signature);
    if (result.published)
      metadata.setPublished(result.published);
    if (result.deactivated)
      metadata.setDeactivated(result.deactivated);
    if (result.alias)
      metadata.setAlias(result.alias);

    return metadata;
  }

  async storeDid(doc: DIDDocument): Promise<void> {
    await this.prisma.didDocument.upsert({
      where: {
        path: this.path,
        did: doc.getSubject().toString(),
      },
      update: {
        doc: doc.toString(),
      },
      create: {
        path: this.path,
        did: doc.getSubject().toString(),
        doc: doc.toString(),
      }
    });
  }

  async loadDid(did: DID): Promise<DIDDocument> {
    const result = await this.prisma.didDocument.findUnique({
      where: {
        path: this.path,
        did: did.toString(),
      },
      select: { doc: true, },
    });

    if (result && result.doc && result.doc != "")
      return await DIDDocument.parseAsync(result.doc);

    return null;
  }

  async deleteDid(did: DID): Promise<boolean> {
    try {
      await this.prisma.didDocument.delete({
        where: {
          path: this.path,
          did: did.toString(),
        }
      });

      await this.prisma.privateKey.deleteMany({
        where: {
          path: this.path,
          did: did.toString(),
        }
      });
    } catch (e) {
      return false;
    }

    await this.prisma.verifiableCredential.deleteMany({
      where: {
        path: this.path,
        did: did.toString(),
      }
    });

    return true;
  }

  async listDids(): Promise<DID[]> {
    const result = await this.prisma.didDocument.findMany({
      where: { path: this.path, },
      select: {
        did: true,
      }
    });

    const dids: DID[] = [];
    for (const d of result)
      dids.push(DID.from(d.did));

    return dids;
  }

  async containsDid(did: DID): Promise<boolean> {
    const result = await this.prisma.didDocument.count({
      where: {
        path: this.path,
        did: did.toString(),
      },
    });

    return result != 0;
  }

  async containsDids(): Promise<boolean> {
    const result = await this.prisma.didDocument.count({
      where: { path: this.path, },
    });
    return result != 0;
  }

  async storeCredentialMetadata(id: DIDURL, metadata: CredentialMetadata): Promise<void> {
    await this.prisma.verifiableCredential.update({
      where: {
        path: this.path,
        id: id.toString(),
      },
      data: {
        txid: metadata.getTransactionId() || null,
        published: metadata.getPublished() || null,
        revoked: metadata.isRevoked() || null,
        alias: metadata.getAlias() || null,
      }
    });
  }

  async loadCredentialMetadata(id: DIDURL): Promise<CredentialMetadata> {
    const result = await this.prisma.verifiableCredential.findUnique({
      where: {
        path: this.path,
        id: id.toString(),
      },
      select: {
        id: true,
        txid: true,
        published: true,
        revoked: true,
        alias: true,
      }
    });

    const metadata = new CredentialMetadata(DIDURL.from(result.id));
    if (result.txid)
      metadata.setTransactionId(result.txid);
    if (result.published)
      metadata.setPublished(result.published);
    if (result.revoked)
      metadata.setRevoked(result.revoked);
    if (result.alias)
      metadata.setAlias(result.alias);
    return metadata;
  }

  async storeCredential(id: DIDURL, vc: Uint8Array, encrypted: boolean): Promise<void> {
    let data = vc;

    if (encrypted) {
      const prefix = Buffer.alloc(4);
      prefix[0] = 0x0E;
      prefix[1] = 0x0C;
      prefix[2] = 0x56;
      prefix[3] = 0x43;
      data = Buffer.concat([prefix, vc]);
    }

    await this.prisma.verifiableCredential.upsert({
      where: {
        path: this.path,
        id: id.toString(),
      },
      update: {
        credential: data.toString(),
      },
      create: {
        path: this.path,
        did: id.getDid().toString(),
        id: id.toString(),
        credential: data.toString(),
      }
    });
  }

  async loadCredential(id: DIDURL): Promise<[Uint8Array, boolean]> {
    const result = await this.prisma.verifiableCredential.findUnique({
      where: {
        path: this.path,
        id: id.toString()
      },
      select: {
        credential: true,
      }
    });

    const content = Buffer.from(result.credential);
    if (content && content[0] == 0x0E && content[1] == 0x0C && content[2] == 0x56 && content[3] == 0x43)
      return [content.slice(4), true];
    else
      return [content, false];
  }

  async containsCredential(id: DIDURL): Promise<boolean> {
    const result = await this.prisma.verifiableCredential.count({
      where: {
        path: this.path,
        id: id.toString(),
      }
    });
    return result != 0;
  }

  async containsCredentials(did: DID): Promise<boolean> {
    const result = await this.prisma.verifiableCredential.count({
      where: {
        path: this.path,
        did: did.toString(),
      }
    });
    return result != 0;
  }

  async deleteCredential(id: DIDURL): Promise<boolean> {
    try {
      await this.prisma.verifiableCredential.delete({
        where: {
          path: this.path,
          id: id.toString(),
        },
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async listCredentials(did: DID): Promise<DIDURL[]> {
    const result = await this.prisma.verifiableCredential.findMany({
      where: {
        path: this.path,
        did: did.toString(),
      },
      select: { id: true, }
    });

    const didurls: DIDURL[] = [];
    for (const vc of result)
      didurls.push(DIDURL.from(vc.id));

    return didurls;
  }

  async containsPrivateKey(id: DIDURL): Promise<boolean> {
    const result = await this.prisma.privateKey.findUnique({
      where: {
        path: this.path,
        did: id.getDid().toString(),
        id: id.toString(),
      },
    });

    return result != null;
  }

  async storePrivateKey(id: DIDURL, privateKey: string): Promise<void> {
    await this.prisma.privateKey.create({
      data: {
        path: this.path,
        id: id.toString(),
        did: id.getDid().toString(),
        context: privateKey,
      }
    });
  }

  async loadPrivateKey(id: DIDURL): Promise<string> {
    const result = await this.prisma.privateKey.findUnique({
      where: {
        path: this.path,
        id: id.toString(),
      },
      select: {
        context: true,
      }
    });
    return result.context;
  }

  async containsPrivateKeys(did: DID): Promise<boolean> {
    const result = await this.prisma.privateKey.count({
      where: { path: this.path, did: did.toString(), },
    });

    return result != 0;
  }

  async deletePrivateKey(id: DIDURL): Promise<boolean> {
    try {
      await this.prisma.privateKey.delete({
        where: {
          path: this.path,
          id: id.toString(),
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  async listPrivateKeys(did: DID): Promise<DIDURL[]> {
    const result = await this.prisma.privateKey.findMany({
      where: { did: did.toString(), },
      select: {
        id: true,
      }
    });

    const didurls: DIDURL[] = [];
    for (const sk of result)
      didurls.push(DIDURL.from(sk.id));

    return didurls;
  }

  async changePassword(reEncryptor: ReEncryptor): Promise<void> {
    const mnemonicResult = await this.prisma.rootIdentity.findMany({
      where: { path: this.path, },
      select: {
        id: true,
        mnemonic: true,
      }
    });

    for (const result of mnemonicResult) {
      await this.prisma.rootIdentity.update({
        where: {
          path: this.path,
          id: result.id
        },
        data: {
          mnemonic: reEncryptor.reEncrypt(result.mnemonic),
        }
      });
    }

    const privateKeyResult = await this.prisma.privateKey.findMany({
      where: { path: this.path },
    });

    for (const sk of privateKeyResult) {
      await this.prisma.privateKey.update({
        where: {
          path: this.path,
          id: sk.id
        },
        data: {
          context: reEncryptor.reEncrypt(sk.context),
        }
      });
    }

    const credentials = await this.prisma.verifiableCredential.findMany({
      where: { path: this.path },
    });

    for (const vc of credentials) {
      const content = Buffer.from(vc.credential);
      if (content && content[0] == 0x0E && content[1] == 0x0C && content[2] == 0x56 && content[3] == 0x43) {
        const d = reEncryptor.reEncrypt(Buffer.from(content.slice(4)).toString());
        let dataBuffer = Buffer.from(d, "utf-8");
        const prefix = Buffer.alloc(4);
        prefix[0] = 0x0E;
        prefix[1] = 0x0C;
        prefix[2] = 0x56;
        prefix[3] = 0x43;
        dataBuffer = Buffer.concat([prefix, dataBuffer]);

        await this.prisma.verifiableCredential.update({
          where: {
            path: this.path,
            id: vc.id,
          },
          data: {
            credential: dataBuffer.toString(),
          }
        });
      }
    }
  }
}