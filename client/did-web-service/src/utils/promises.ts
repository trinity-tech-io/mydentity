import { BehaviorSubject, filter } from "rxjs";

/**
 * Blocks until the subject's value becomes equals to the target value.
 */
export function awaitSubjectValue<T>(subject: BehaviorSubject<T>, targetValue: T): Promise<void> {
  return new Promise(resolve => {
    const sub = subject.pipe(filter(value => value === targetValue)).subscribe(value => {
      sub.unsubscribe();
      resolve();
    })
  });
}