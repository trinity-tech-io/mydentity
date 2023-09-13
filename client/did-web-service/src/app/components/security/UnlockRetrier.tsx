import { MainButton } from "@components/generic/MainButton";
import clsx from "clsx";
import { FC } from "react";
import { useUnlockKeyPrompt } from "./unlock-key-prompt/UnlockKeyPrompt";

/**
 * Component that requests all methods that failed after a failure to unlock the master key,
 * to retry. ie: advanced behavior subjects.
 */
export const UnlockRetrier: FC<{
  className?: string;
}> = ({ className }) => {
  const { retryUnlock } = useUnlockKeyPrompt();

  const retryToUnlock = (): void => {
    retryUnlock();
  }

  return (
    <div className={clsx("flex flex-row items-center gap-2", className)}>
      <div>This content could not be unlocked, please retry</div>
      <MainButton onClick={retryToUnlock}>Unlock personal data</MainButton>
    </div>
  )
}