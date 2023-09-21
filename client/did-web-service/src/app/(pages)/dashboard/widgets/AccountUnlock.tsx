import CheckIcon from '@assets/images/check-full.svg';
import CrossIcon from '@assets/images/cross-full.svg';
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import clsx from "clsx";
import { isNil } from "lodash";
import { FC, useEffect, useState } from 'react';
import { SecurityState, SecurityStatus } from "../components/SecurityStatus";

export const AccountUnlock: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [passkeys] = useBehaviorSubject(activeUser?.get("security").passkeyKeys$);
  const [passwords] = useBehaviorSubject(activeUser?.get("security").passwordKeys$);
  const [securityState, setSecurityState] = useState<SecurityState>(SecurityState.Unknown);
  const [advice, setAdvice] = useState<string>(null);

  useEffect(() => {
    if (isNil(passwords) || isNil(passkeys)) {
      // Unknown status so far
      setSecurityState(SecurityState.Unknown);
      setAdvice("Checking status...");
      return;
    }

    if (passwords.length > 0) {
      // At least one password
      if (passkeys.length > 0) {
        // At least one browser
        setSecurityState(SecurityState.Good);
        setAdvice("Perfect, you will be able to unlock your encrypted data with your password or with your browser.");
        return;
      }
      else {
        // No browser
        setSecurityState(SecurityState.Good);
        setAdvice("All good, you will be able to unlock your encrypted data with your password. You could also bind one or more browsers for faster access");
        return;
      }
    }
    else {
      // No password
      if (passkeys.length > 0) {
        // At least one passkey
        setSecurityState(SecurityState.Average);
        setAdvice("Only 1 browser bound but no password. You will loose your account if you loose access to the password. Remember that the password cannot be recovered, there is no 'password lost' service.");
        return;
      }
      else {
        // No passkey
        setSecurityState(SecurityState.Bad);
        setAdvice("No email nor password bound to your account yet, you don't have access to all the features that use encrypted data such as identities.");
        return;
      }
    }

    throw new Error(`Unhandled AccountUnlock case, ${passwords?.length} emails, ${passkeys?.length} passkeys`);
  }, [passwords, passkeys]);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-3">
      <header className="px-2 py-1 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Encrypted content access</h2>
      </header>

      <div className='p-2'>
        <div className={clsx("col-span-6 flex flex-row gap-2", passwords?.length == 0 && "opacity-30")}>
          {passwords?.length == 0 && <><CrossIcon width={20} /> No global password can decrypt my data</>}
          {passwords?.length > 0 && <><CheckIcon width={20} /> I can decrypt my data using my password, from anywhere</>}
        </div>
        <div className={clsx("col-span-6 flex flex-row gap-2", passkeys?.length == 0 && "opacity-30")}>
          {passkeys?.length == 0 && <><CrossIcon width={20} /> I can't decrypt my data using this browser biometrics</>}
          {passkeys?.length > 0 && <><CheckIcon width={20} /> I can decrypt my data using this browser (biometrics)</>}
        </div>
      </div>

      <div className="p-3 flex flex-row items-center gap-4">
        <SecurityStatus state={securityState} />
        <Typography>{advice}</Typography>
      </div>
    </div>
  );
}
