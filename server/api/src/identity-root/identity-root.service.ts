import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IdentityRoot, User, Browser } from '@prisma/client/main';
import { DidService } from 'src/did/did.service';
import { AppException } from 'src/exceptions/app-exception';
import { AuthExceptionCode, DIDExceptionCode } from 'src/exceptions/exception-codes';
import { MnemonicEntity } from 'src/identity/entities/mnemonic.entity';
import { KeyRingService } from 'src/key-ring/key-ring.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class IdentityRootService {
  private logger: Logger = new Logger("IdentityRootService");

  constructor(private prisma: PrismaService,
    private didService: DidService,
    private keyRingService: KeyRingService,
  ) {
  }

  async findAll(): Promise<IdentityRoot[]> {
    const identityRoots = await this.prisma.identityRoot.findMany({
      include: {
        Identity: true
      }
    });

    this.logger.log('Find All:', identityRoots)
    return identityRoots;
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
}
