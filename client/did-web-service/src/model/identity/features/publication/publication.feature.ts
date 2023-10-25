import { IdentityPublicationState } from "@model/identity-publication/identity-publication-state";
import { Identity } from "@model/identity/identity";
import { identityService } from "@services/identity/identity.service";
import { logger } from "@services/logger";
import { AdvancedBehaviorSubject } from "@utils/advanced-behavior-subject";
import { awaitSubjectValue } from "@utils/promises";
import { sleep } from "@utils/sleep";
import { IdentityFeature } from "../identity-feature";

export class PublicationFeature implements IdentityFeature {
  public publicationStatus$ = new AdvancedBehaviorSubject<IdentityPublicationState>(null, async () => {
    this.startCheckingPublicationStatus();
  });

  constructor(protected identity: Identity) { }

  /**
   * Requests to publish the latest version of the DID Document and returns true if published, false in case
   * of error.
   */
  public async publish(): Promise<boolean> {
    this.publicationStatus$.next(IdentityPublicationState.PUBLISHING);
    await identityService.publishIdentity(this.identity.did);

    this.startCheckingPublicationStatus();

    // Resolve only when the status became published or failed to publish. Wait otherwise
    return new Promise(resolve => {
      this.publicationStatus$.subscribe(status => {
        if (status == IdentityPublicationState.PUBLISHED)
          resolve(true);
        else if (status == IdentityPublicationState.FAILED_TO_PUBLISH)
          resolve(false);
      });
    });
  }

  private async startCheckingPublicationStatus(): Promise<void> {
    try {
      while (this.shouldContinueCheckingStatus()) {
        await this.fetchPublicationStatus(this.identity.did);
        await sleep(2000);
      }
    }
    catch (e) {
      logger.error("publication", "Exception while fetching identity publication status", e)
    }
  }

  private shouldContinueCheckingStatus(): boolean {
    const state = this.publicationStatus$.value;
    return !state || state === IdentityPublicationState.UNPUBLISHED || state === IdentityPublicationState.PUBLISHING;
  }

  public async fetchPublicationStatus(didString: string): Promise<void> {
    const status = await identityService.getPublicationStatus(didString);
    logger.log("publication", "Got publication status", status?.state);

    this.publicationStatus$.next(status?.state);
  }

  public awaitIdentityPublished(): Promise<void> {
    return awaitSubjectValue(this.publicationStatus$, IdentityPublicationState.PUBLISHED);
  }
}
