import { BehaviorSubject } from "rxjs";

/**
 * Wrapper around rxjs behaviorsubject, that calls an initializer function only when first accessed.
 * This is a way to load data only on demand.
 *
 * NOTE: The initializer method is responsible for feeding the subject.
 */
export class LazyBehaviorSubjectWrapper<T> {
  private subject: BehaviorSubject<T>;
  private fetchedOrFetching = false;

  constructor(initialValue: T, private initializer: () => Promise<void | T> | void) {
    this.subject = new BehaviorSubject(initialValue);
  }

  public getSubject(customData?: any): BehaviorSubject<T> {
    if (!this.fetchedOrFetching) {
      this.fetchedOrFetching = true;

      // Call the initializer, it will populate the subject.
      void this.initializer();
    }

    return this.subject;
  }
}