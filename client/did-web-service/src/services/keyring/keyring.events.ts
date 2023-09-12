import { Subject } from "rxjs";

/**
 * Emits whenever the master key gets unlocked
 */
export const onMasterKeyUnlock$ = new Subject<boolean>();
