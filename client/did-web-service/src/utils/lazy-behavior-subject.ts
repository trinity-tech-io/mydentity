import { BehaviorSubject, Observer, Subscription } from "rxjs";

/**
 * Wrapper around rxjs behaviorsubject, that calls an initializer function only when first accessed.
 * This is a way to load data only on demand.
 *
 * The initializer also emits the init value.
 */
export class LazyBehaviorSubjectWrapper<T> {
  private subject: BehaviorSubject<T>;
  private fetchedOrFetching = false;

  constructor(initialValue: T, private initializer: () => Promise<T | void>) {
    this.subject = new BehaviorSubject(initialValue);
  }

  public getSubject(customData?: any): BehaviorSubject<T> {
    if (!this.fetchedOrFetching) {
      this.fetchedOrFetching = true;

      // Call the initializer, and update the subject with the init value.
      void this.initializer().then(initValue => initValue && this.subject.next(initValue));
    }

    return this.subject;
  }
}

/**
 * Extended BehaviorSubject to provide additional features:
 * - Initialize with a default value (usually null or empty) and fetch real initialization data only
 * when the first subscriber subscribes. This allows fetching data lazily only when required.
 */
export class LazyBehaviorSubject<T> extends BehaviorSubject<T> {
  private fetchedOrFetching = false;

  constructor(initialValue: T, private initializer: () => Promise<T | void>) {
    super(initialValue);
  }

  subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
  subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Subscription;
  subscribe(next?: unknown, error?: unknown, complete?: unknown): Subscription {
    // The first subscriber triggers the real data initialization
    if (!this.fetchedOrFetching) {
      this.fetchedOrFetching = true;

      // Call the initializer, and update the subject with the init value.
      void this.initializer().then(initValue => initValue && this.next(initValue));
    }

    // Call the parent subscribe() method with the same arguments
    return super.subscribe(...arguments);
  }
}