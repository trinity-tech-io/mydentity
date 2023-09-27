import { BehaviorSubject, filter } from "rxjs";

/**
 * Blocks until the subject's value becomes equals to the target value.
 */
export function awaitSubjectValue<T>(subject: BehaviorSubject<T>, targetValue: T): Promise<void> {
  return new Promise(resolve => {
    const sub = subject.pipe(filter(value => value === targetValue)).subscribe(value => {
      // Make sure we are out of subscribe() before trying to unsubscribing "sub"
      setTimeout(() => sub.unsubscribe(), 0);
      resolve();
    })
  });
}

/**
 * Blocks until the subject's value becomes non null
 */
export function awaitSubjectNonNull(subject: BehaviorSubject<any>): Promise<void> {
  return new Promise(resolve => {
    const sub = subject.pipe(filter(value => !!value)).subscribe(() => {
      // Make sure we are out of subscribe() before trying to unsubscribing "sub"
      setTimeout(() => sub.unsubscribe(), 0);
      resolve();
    })
  });
}