import React, {
  Dispatch,
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TransitionProps } from "@mui/material/transitions";
import SecurityIcon from "@mui/icons-material/Security";
import { Dialog, Grow, Typography, styled } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { AppException } from "@model/exceptions/app-exception";
import { ClientError } from "@model/exceptions/exception-codes";
import { ShadowKeyType } from "@model/shadow-key/shadow-key-type";
import { withCaughtAppException } from "@services/error.service";
import { AuthKeyInput } from "@services/keyring/auth-key.input";
import { unlockMasterKey } from "@services/keyring/keyring.service";
import { logger } from "@services/logger";
import { isUnlockException } from "@services/security/security.service";
import { authUser$ } from "@services/user/user.events";
import { PasskeyPrompt } from "./PasskeyPrompt";
import { PasswordPrompt } from "./PasswordPrompt";
import { callWithUnlock } from "./call-with-unlock";
import {
  UnlockPromptState,
  UnlockRequest,
  callWithUnlockRequestEvent$,
  unlockPromptState$,
} from "./unlock.events";
import { IconAvatar } from "@components/feature/DetailLine";
import { CardCase } from "@components/card";
import SeparateLineText from "@components/separate-line";

type OnUnlockKeyCallback = (authorization: AuthKeyInput) => void;

type UnlockKeyPromptActions = {
  onUnlockKey?: OnUnlockKeyCallback;
};

interface UnlockKeyPromptContextType {
  actions: UnlockKeyPromptActions;
  setActions: Dispatch<UnlockKeyPromptActions>;
}

export const UnlockKeyPromptContext = createContext<UnlockKeyPromptContextType>(
  {
    actions: null,
    setActions: null,
  }
);

export function UnlockKeyPromptContextProvider(props: any): JSX.Element {
  const [actions, setActions] = useState<UnlockKeyPromptActions>(null);

  return (
    <UnlockKeyPromptContext.Provider value={{ actions, setActions }}>
      {props.children}
      <UnlockKeyPrompt />
    </UnlockKeyPromptContext.Provider>
  );
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const TitleBox = styled("div")(({ theme }) => ({
  background: "linear-gradient(to right, #242424, #333 50%, transparent)",
}));

const UnlockKeyPrompt: FC = () => {
  const { actions, setActions } = useContext(UnlockKeyPromptContext);
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [passwordKeys] = useBehaviorSubject(securityFeature?.passwordKeys$);
  const [passkeyKeys] = useBehaviorSubject(securityFeature?.passkeyKeys$);
  const { promptMasterKeyUnlock } = useUnlockKeyPrompt();

  const hideDialog = (): void => {
    setActions(null); // Hides the dialog
  };

  // User closing / click outside
  const onClose = (): void => {
    actions.onUnlockKey?.(null); // Notify that unlock was completed but with no result
    hideDialog();
  };

  const onPasswordConfirmation = (password: string): void => {
    actions.onUnlockKey?.({
      type: ShadowKeyType.PASSWORD,
      keyId: "unused-for-now-for-passwords",
      key: password,
    });
    hideDialog();
  };

  const onPasskeyConfirmation = (authKey: AuthKeyInput): void => {
    actions.onUnlockKey?.(authKey);
    hideDialog();
  };

  useEffect(() => {
    const sub = callWithUnlockRequestEvent$.subscribe((request) => {
      if (!request || request.handled) return;

      request.handled = true;

      callWithUnlockHandler(request, promptMasterKeyUnlock);
    });
    return () => sub.unsubscribe();
  }, [promptMasterKeyUnlock]);

  return (
    <Dialog
      open={Boolean(actions)}
      disablePortal
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{ sx: { backgroundImage: "none" } }}
    >
      <div className="p-6">
        <TitleBox className="flex items-center gap-x-2 px-4 py-2">
          <IconAvatar>
            <SecurityIcon fontSize="small" />
          </IconAvatar>
          <Typography variant="h6" fontWeight={600} className="ml-4">
            Screen content is locked!
          </Typography>
        </TitleBox>
        <Typography variant="body1" className="px-4 py-2">
          Enter password or authenticate passkey to unlock the screen.
        </Typography>
        <CardCase className="relative w-full mt-4 md:pb-2">
          <div className="absolute inset-0 p-2">
            <div className="dashed-body w-full h-full rounded-2xl p-1.5 flex items-center">
              <div className="px-6 py-8 w-full">
                <div className="flex flex-col gap-2">
                  <PasswordPrompt
                    onConfirm={onPasswordConfirmation}
                    disabled={passwordKeys?.length == 0}
                  />
                  <div className="p-2 pt-0 text-center">
                    <div className="py-4">
                      <SeparateLineText text="or browser authentication" />
                    </div>
                    <PasskeyPrompt
                      onConfirm={onPasskeyConfirmation}
                      disabled={passkeyKeys?.length == 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardCase>
      </div>
    </Dialog>
  );
};

export default React.memo(UnlockKeyPrompt);

/**
 * Convenient hooked booleans to get unlocker state
 */
export function useUnlockPromptState(): {
  unlockerIsIdle: boolean;
  unlockerIsCancelled: boolean;
} {
  const [unlockerState] = useBehaviorSubject(unlockPromptState$);
  const [unlockerIsIdle, setUnlockerIsIdle] = useState(true);
  const [unlockerIsCancelled, setUnlockerIsCancelled] = useState(false);

  useEffect(() => {
    switch (unlockerState) {
      case UnlockPromptState.Idle:
        setUnlockerIsIdle(true);
        setUnlockerIsCancelled(false);
        break;
      case UnlockPromptState.UnlockCancelled:
        setUnlockerIsIdle(false);
        setUnlockerIsCancelled(true);
        break;
    }
  }, [unlockerState]);

  return { unlockerIsIdle, unlockerIsCancelled };
}

export const useUnlockKeyPrompt = (): {
  promptMasterKeyUnlock: () => Promise<AuthKeyInput>;
  retryUnlock: () => Promise<void>;
} => {
  const { setActions } = useContext(UnlockKeyPromptContext);
  const [activeUser] = useBehaviorSubject(authUser$);

  const promptMasterKeyUnlock = (): Promise<AuthKeyInput> => {
    return new Promise((resolve) => {
      setActions({ onUnlockKey: resolve });
    });
  };

  const retryUnlock = (): Promise<void> => {
    return callWithUnlock(() => {
      return activeUser.get("security").checkRemoteUnlockStatus();
    });
  };

  return { promptMasterKeyUnlock, retryUnlock };
};

/**
 * Counterpart to callWithUnlock() running in the UI context.
 */
async function callWithUnlockHandler(
  request: UnlockRequest<any>,
  promptMasterKeyUnlock: () => Promise<AuthKeyInput>
): Promise<void> {
  try {
    const result = await withCaughtAppException(() => {
      return request.method();
    });
    request.resolve(result);
  } catch (e) {
    // Exception during the API call. Check if this is a unlock key requirement app exception and if so,
    // trigger the master unlock callback to let the UI prompt the unlock method to the user
    if (e instanceof AppException && isUnlockException(e)) {
      logger.warn(
        "security",
        "This method call requires unlock authorization from the user. Prompting"
      );
      const auth = await promptMasterKeyUnlock();
      if (auth) {
        // Client side auth provided: try to unlock on the API side and call the original api again
        await unlockMasterKey(auth);
        const result = await callWithUnlock(
          request.method,
          request.silentCancellation,
          request.defaultValue,
          false
        );
        request.resolve(result);
      } else {
        // Operation cancelled by user, this is a failure to bind password
        unlockPromptState$.next(UnlockPromptState.UnlockCancelled);
        logger.warn("security", "Unlock operation cancelled by user");
        request.reject(
          AppException.newClientError(
            ClientError.UnlockKeyCancelled,
            "CANCELLED"
          )
        );
      }
    } else {
      logger.error(
        "security",
        "Unhandled callWithUnlock() exception (will get stuck):",
        e
      );
    }
  }
}
