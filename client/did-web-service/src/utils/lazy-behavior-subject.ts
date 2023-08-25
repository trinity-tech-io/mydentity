import { BehaviorSubject } from "rxjs";

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