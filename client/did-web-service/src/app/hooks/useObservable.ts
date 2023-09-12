import { useState, useEffect } from "react";
import { Observable } from "rxjs";

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
