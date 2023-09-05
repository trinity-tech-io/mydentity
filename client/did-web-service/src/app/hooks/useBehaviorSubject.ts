import { useEffect, useState } from "react";
import { BehaviorSubject, Observable } from "rxjs";

/**
 * Updates the returned value with the latest value of the BehaviorSubject every time it changes.
 * Optionally, also calls a given callback at that time.
 */
export const useBehaviorSubject = <T>(observable: BehaviorSubject<T>, callback?: (value: T) => void) => {
  const [value, setValue] = useState<T>(observable?.getValue());
  const [error, setError] = useState();

  useEffect(() => {
    if (!observable)
      return

    const subscription = observable.subscribe({
      next: val => {
        setValue(val);
        callback?.(val);
      },
      error: setError
    });

    return () => subscription.unsubscribe()
  }, [observable, callback]);

  return [value];
}

export const useObservable = <T>(observable: Observable<T>, defaultValue: T, callback?: (value: T) => void) => {
  const [value, setValue] = useState<T>(defaultValue);
  const [error, setError] = useState();

  useEffect(() => {
    if (!observable)
      return

    const subscription = observable.subscribe({
      next: val => {
        setValue(val);
        callback?.(val);
      },
      error: setError
    });

    return () => subscription.unsubscribe()
  }, [observable]);

  return [value];
}
