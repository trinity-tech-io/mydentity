
/**
 * Similar to useBehaviorSubject() but also catches unlock master key events (for methods that require
 * master key unlock) in order to give beter feedback to the UI and allow retrying unlocking in case
 * of previous failure.
 */
/* export const useUnlockableBehaviorSubject = <T>(subject: AdvancedBehaviorSubject<T>) => {
  const [value, setValue] = useState<T>(subject?.getValue());
  const [error, setError] = useState();

  useEffect(() => {
    if (!subject)
      return

    const sub = subject.subscribe({
      next: val => {
        setValue(val);
      },
      error: setError
    });

    const stateSub = subject.initializerState.subscribe(subjectState => {
      console.log("STATE", subjectState)
    })

    return () => {
      sub.unsubscribe();
      stateSub.unsubscribe();
    }
  }, [subject]);

  return [value];
} */
