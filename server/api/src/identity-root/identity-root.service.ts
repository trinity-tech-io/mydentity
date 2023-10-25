import { DID, DIDStore, DIDURL } from '@elastosfoundation/did-js-sdk';
import { HttpStatus, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { Browser, Identity, IdentityRoot, IdentityType, User } from '@prisma/client/main';
import { CredentialsService } from 'src/credentials/credentials.service';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { MnemonicEntity } from 'src/identity/entities/mnemonic.entity';
import { IdentityService } from 'src/identity/identity.service';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdentityRootService {
  private logger: Logger = new Logger("IdentityRootService");

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => IdentityService)) private identityService: IdentityService,
    private credentialsService: CredentialsService,
    private didService: DidService,
    private keyRingService: KeyRingService,
  ) { }

  /**
   * Gets a prisma identity root entry by its ID (NOT a did store id)
   */
  public async findOne(id: string) {
    if (!id)
      return null;

    return this.prisma.identityRoot.findFirst({ where: { id } });
  }

  async findAll(userId: string): Promise<IdentityRoot[]> {
    const identityRoots = await this.prisma.identityRoot.findMany({
      where: {
        userId
      },
      include: {
        Identity: {
          include: {
            creatingAppIdentity: true
          }
        }
      }
    });
    return identityRoots;
  }

  /**
   * Retrieves a potentially existing root identity for the given mnemonic.
   * If not existing, one is created.
   */
  public async getOrCreateFromMnemonic(user: User, storePassword: string, mnemonic: string): Promise<IdentityRoot> {
    const rootIdentity = await this.didService.getOrCreateRootIdentity(user.id, mnemonic, storePassword);

    // Check if we have a IdentityRoot in our database that already use this root identity that potentially already existed.
    const existingIdentityRoot = await this.prisma.identityRoot.findFirst({
      where: {
        userId: user.id,
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    if (existingIdentityRoot)
      return existingIdentityRoot;

    // No identity root uses this store root identity yet: create one
    const identityRoot = await this.prisma.identityRoot.create({
      data: {
        user: { connect: { id: user.id } },
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    return identityRoot;
  }

  /**
   * Creates a new root identity for the given mnemonic.
   * Throws an exception if the root identity already exists.
   */
  public async createFromMnemonic(user: User, storePassword: string, mnemonic: string): Promise<IdentityRoot> {
    const rootIdentity = await this.didService.createRootIdentity(user.id, mnemonic, storePassword);
    if (!rootIdentity)
      throw new AppException(DIDExceptionCode.MnemonicError, "DID store root identity could not be created", 403);

    const identityRoot = await this.prisma.identityRoot.create({
      data: {
        user: { connect: { id: user.id } },
        didStoreRootIdentityId: rootIdentity.getId()
      }
    });

    return identityRoot;
  }

  async exportMnemonic(context: string, identityRootId: string, user: User, browser: Browser): Promise<MnemonicEntity> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    try {
      const rootIdentity = await this.didService.loadRootIdentity(context, identityRootId);
      const menmonic = await rootIdentity.exportMnemonic(storePassword);
      return {
        mnemonic: menmonic
      }
    } catch (e) {
      this.logger.log(`exportMnemonic exception: ${e}`)
      throw new AppException(DIDExceptionCode.DIDStorageError, e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Ensures that the identityRootId identity root is owned by user and returns the identityRoot.
   * If not, throws an exception.
   */
  public async ensureOwnedIdentityRoot(identityRootId: string, user: User): Promise<IdentityRoot> {
    const identityRoot = await this.prisma.identityRoot.findFirst({
      where: {
        id: identityRootId,
        userId: user.id
      }
    })
    if (!identityRoot) {
      this.logger.log('ensureOwnedIdentityRoot identityRootId:' + identityRootId + ' user.id:' + user.id);
      throw new AppException(AuthExceptionCode.IdentityRootNotOwned, `You are not owner of identity root ${identityRootId}`, 401);
    }

    return identityRoot;
  }

  private getDIDStorePassword(userId: string, browserId: string) {
    return this.keyRingService.getMasterKey(userId, browserId);
  }

  /**
   * After a call to synchronize() on the user's DID store, this method checks the given identity root and
   * compares its content (DID store side) with the service database, to create everything missing.
   *
   * - Identities
   * - Credentials inside identities
   *
   * TODO: Not only create but also update?
   *
   * @returns the list of modified and created identities
   */
  public async synchronizeDIDStoreToDatabase(user: User, browser: Browser, identityRoot: IdentityRoot): Promise<{ modified: Identity[], created: Identity[] }> {
    const storePassword = this.getDIDStorePassword(user?.id, browser?.id);

    this.logger.log(`Synchronizing DID Store to database`);

    const createdIdentities: Identity[] = [];
    const modifiedIdentities: Identity[] = [];

    const didStore = await this.didService.openStore(user.id);
    const allDids = await didStore.listDids();

    for (const did of allDids) {
      // Only deal with DIDs that belong to the target root identity
      const metadata = await did.getMetadata();
      if (metadata.getRootIdentityId() === identityRoot.didStoreRootIdentityId) {
        const { modified, created } = await this.synchronizeIdentityFromDIDStore(user, browser, didStore, did, storePassword, identityRoot)
        if (modified)
          modifiedIdentities.push(modified);
        if (created)
          createdIdentities.push(created);
      }
    }

    return {
      created: createdIdentities,
      modified: modifiedIdentities
    }
  }

  private async synchronizeIdentityFromDIDStore(user: User, browser: Browser, didStore: DIDStore, did: DID, storePassword: string, identityRoot: IdentityRoot): Promise<{ modified: Identity; created: Identity }> {
    let created: Identity = null;
    let modified: Identity = null;

    this.logger.log(`Synchronizing identity from DID store:`, did.toString());

    // Make sure we have this DID as "Identity" in the database. If not, create it.
    let identity = await this.identityService.findOne(did.toString());
    if (!identity) {
      // Identity doesn't exist, create it
      // TODO: REGULAR is wrong here. We should actually check if there if an appinfo redential inside.
      identity = await this.identityService.importIdentity(user, did.toString(), IdentityType.REGULAR, identityRoot.id);
      created = identity;
    }
    else {
      modified = identity;
    }

    if (!identity)
      throw new AppException(DIDExceptionCode.SyncError, "Identity could not be created while synchronizing imported DIDs to local database", 500);

    // Now sync (upsert) credentials
    const credentialIds = await didStore.listCredentials(identity.did);
    this.logger.log(`Identity ${identity.did} has ${credentialIds.length} credentials`);
    for (const credentialId of credentialIds) {
      const { created: credentialCreated } = await this.synchronizeCredentialFromDIDStore(user, browser, didStore, identity, credentialId);
      if (credentialCreated && !created) {
        // Identity is modified if a new credential was created. But only if identity is not marked as "created"
        // because we don't want to duplicate this identity in the list of created AND  modified identities. "created" has priority
        modified = identity;
      }
    }

    return { modified, created };
  }

  private async synchronizeCredentialFromDIDStore(user: User, browser: Browser, didStore: DIDStore, identity: Identity, credentialId: DIDURL): Promise<{ created: boolean }> {
    this.logger.log(`Synchronizing credential from DID store`);

    // Check if we already have this credential in the database. If not, create it
    const credential = await this.credentialsService.findByCredentialId(credentialId.toString());
    if (credential) {
      // Credential already exists, do nothing (maybe later we can update).
      return { created: false };
    }

    const vc = await didStore.loadCredential(credentialId);
    await this.credentialsService.storeCredential({
      identityDid: identity.did,
      credentialString: await vc.toString()
    }, user, browser.id);

    return { created: true };
  }
}
