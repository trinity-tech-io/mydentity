import CheckIcon from '@assets/images/check-full.svg';
import CrossIcon from '@assets/images/cross-full.svg';
import { MainButton } from "@components/generic/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Typography } from "@mui/material";
import { authUser$ } from "@services/user/user.events";
import clsx from 'clsx';
import { isNil } from "lodash";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from 'react';
import { SecurityState, SecurityStatus } from "../components/SecurityStatus";

export const AccountAccess: FC = _ => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [boundEmails] = useBehaviorSubject(activeUser?.get("email").userEmails$);
  const [passkeys] = useBehaviorSubject(activeUser?.get("security").passkeyKeys$);
  const [securityState, setSecurityState] = useState<SecurityState>(SecurityState.Unknown);
  const [advice, setAdvice] = useState<string>(null);
  const [goToSecurityCenter, setGoToSecurityCenter] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setGoToSecurityCenter(false);

    if (isNil(boundEmails) || isNil(passkeys)) {
      // Unknown status so far
      setSecurityState(SecurityState.Unknown);
      setAdvice("Checking status...");
      return;
    }

    if (boundEmails.length > 0) {
      // At least one email
      if (passkeys.length > 0) {
        // At least one browser
        setSecurityState(SecurityState.Good);
        setAdvice("Perfect, you will be able to sign in to your account with your email or with your browser");
        return;
      }
      else {
        // No browser
        setSecurityState(SecurityState.Good);
        setAdvice("All good, you will be able to sign in to your account with your email. You could also bind one or more browsers for faster access");
        return;
      }
    }
    else {
      // No email
      if (passkeys.length > 0) {
        // At least one passkey
        setSecurityState(SecurityState.Average);
        setAdvice("Only 1 browser bound but no email address. You will loose your account if you loose access to the browser.");
        setGoToSecurityCenter(true);
        return;
      }
      else {
        // No passkey
        setSecurityState(SecurityState.Bad);
        setAdvice("No email nor browser bound to your account yet, you won't be able to sign in to your account. Please check the security center soon.");
        setGoToSecurityCenter(true);
        return;
      }
    }

    throw new Error(`Unhandled AccountAccess case, ${boundEmails?.length} emails, ${passkeys?.length} passkeys`);
  }, [boundEmails, passkeys]);

  const openSecurityCenter = (): void => {
    router.push("/account/security");
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 p-3 ">
      <header className="px-2 py-1 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Account access</h2>
      </header>

      <div className='p-2'>
        <div className={clsx("col-span-6 flex flex-row gap-2", boundEmails?.length == 0 && "opacity-30")}>
          {boundEmails?.length == 0 && <><CrossIcon width={20} /> I can't sign in using an email address</>}
          {boundEmails?.length > 0 && <><CheckIcon width={20} /> I can sign in from anywhere with my email address</>}
        </div>
        <div className={clsx("col-span-6 flex flex-row gap-2", passkeys?.length == 0 && "opacity-30")}>
          {passkeys?.length == 0 && <><CrossIcon width={20} /> I can't sign in with this browser</>}
          {passkeys?.length > 0 && <><CheckIcon width={20} /> I can sign in from current browser using biometrics</>}
        </div>
      </div>

      <div className="py-2 flex flex-row items-center gap-4">
        <SecurityStatus state={securityState} />
        <Typography>{advice}</Typography>
      </div>
      {goToSecurityCenter && <MainButton onClick={openSecurityCenter}>Go to security center</MainButton>}
    </div>
  );
}
