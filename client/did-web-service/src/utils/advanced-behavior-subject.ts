import { onMasterKeyUnlock$ } from "@services/keyring/keyring.events";
import { logger } from "@services/logger";
import { isUnlockPromptCancelledException } from "@services/security/security.service";
import { BehaviorSubject, Observer, Subscription } from "rxjs";

export enum InitializerState {
  NotCalled, // The initializer has nt been called yet (nobody suscribed)
  Called, // The initializer has been called successfully
  FailedUnlock, // The initialized failed to complete successfully because some code required to unlock the master key but user cancelled or failed.
  Failed // Failed for another reason
}

/**
 * Extended BehaviorSubject to provide additional features:
 * - Initialize with a default value (usually null or empty) and fetch real initialization data only
 * when the first subscriber subscribes. This allows fetching data lazily only when required.
 */
export class AdvancedBehaviorSubject<T> extends BehaviorSubject<T> {
  private fetchedOrFetching = false;
  public initializerState = new BehaviorSubject<InitializerState>(InitializerState.NotCalled);
  private masterKeyUnlockSub: Subscription;

  constructor(initialValue: T, private initializer?: () => Promise<T | void>) {
    super(initialValue);
  }

  public hasInitializer(): boolean {
    return !!this.initializer;
  }

  subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  subscribe(next?: unknown, error?: unknown, complete?: unknown): Subscription {
    // The first subscriber triggers the real data initialization
    if (!this.fetchedOrFetching) {
      this.fetchedOrFetching = true;
      this.callInitializer();
    }

    // Call the parent subscribe() method with the same arguments
    // eslint-disable-next-line prefer-rest-params
    return super.subscribe(...arguments);
  }

  private callInitializer(): void {
    if (!this.initializer)
      return;

    // If provided, call the initializer, and update the subject with the init value.
    this.initializer().then(initValue => {
      if (initValue) {
        this.next(initValue);
        this.initializerState.next(InitializerState.Called);
      }
    }).catch(e => {
      if (isUnlockPromptCancelledException(e)) {
        // First time we get a master unlock failure, register to master unlock event so
        // that we know when the key became available and we can try again to initialize the data.
        if (!this.masterKeyUnlockSub) {
          console.log("SUB")
          this.masterKeyUnlockSub = onMasterKeyUnlock$.subscribe(() => {
            console.log("CB", this.initializerState.value.toString())
            // Call the initializer if we are not yet initialized and the master key became unlocked
            if (this.initializerState.value === InitializerState.NotCalled || this.initializerState.value === InitializerState.FailedUnlock) {
              this.callInitializer();
            }
          });
        }
        // Silent
        this.initializerState.next(InitializerState.FailedUnlock);
      } else {
        logger.error("AdvancedBehaviorSubject", e);
        this.initializerState.next(InitializerState.Failed);
      }
    });
  }
}