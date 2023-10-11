import { FC, useEffect, useState } from "react";
import { isNil } from "lodash";
import { useRouter } from "next13-progressbar";
import { TableCell } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { SecurityState, SecurityStatus } from "../components/SecurityStatus";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { AccountAccessRow } from "./account/AccountAccessRow";
import { DarkButton } from "@components/button";
import { useMounted } from "@hooks/useMounted";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";

export const AccountAccess: FC = (_) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  const { mounted } = useMounted();
  const [boundEmails] = useBehaviorSubject(
    activeUser?.get("email").userEmails$
  );
  const [passkeys] = useBehaviorSubject(
    activeUser?.get("security").passkeyKeys$
  );
  const [securityState, setSecurityState] = useState<SecurityState>(
    SecurityState.Unknown
  );
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
        setAdvice(
          "Perfect, you will be able to sign in to your account with your email or with your browser"
        );
        return;
      } else {
        // No browser
        setSecurityState(SecurityState.Good);
        setAdvice(
          "All good, you will be able to sign in to your account with your email. You could also bind one or more browsers for faster access"
        );
        return;
      }
    } else {
      // No email
      if (passkeys.length > 0) {
        // At least one passkey
        setSecurityState(SecurityState.Average);
        setAdvice(
          "Only 1 browser bound but no email address. You will loose your account if you loose access to the browser."
        );
        setGoToSecurityCenter(true);
        return;
      } else {
        // No passkey
        setSecurityState(SecurityState.Bad);
        setAdvice(
          "No email nor browser bound to your account yet, you won't be able to sign in to your account. Please check the security center soon."
        );
        setGoToSecurityCenter(true);
        return;
      }
    }

    throw new Error(
      `Unhandled AccountAccess case, ${boundEmails?.length} emails, ${passkeys?.length} passkeys`
    );
  }, [boundEmails, passkeys]);

  const openSecurityCenter = (): void => {
    router.push("/account/security");
  };

  return (
    <DetailContainer
      className="h-full"
      title="Account Access"
      able2ShowAll={false}
    >
      <DetailTable
        headCells={
          <>
            <TableCell>SIGN IN METHOD</TableCell>
            <TableCell>STATUS</TableCell>
          </>
        }
        bodyRows={
          !mounted || isNil(boundEmails) || isNil(passkeys) ? (
            Array(2)
              .fill(0)
              .map((_, _i) => <LoadingTableAvatarRow key={_i} />)
          ) : (
            <>
              <AccountAccessRow
                method="email"
                secondaryDetail={
                  boundEmails?.length > 0
                    ? boundEmails[0].email
                    : "No available email address found"
                }
                isSet={boundEmails?.length > 0}
              />
              <AccountAccessRow
                method="browser"
                secondaryDetail={activities[0]?.browserNameStr}
                isSet={passkeys?.length > 0}
              />
            </>
          )
        }
      />

      {!!advice && <SecurityStatus state={securityState} advice={advice} />}

      {goToSecurityCenter && (
        <div className="mt-[6%]">
          <DarkButton
            startIcon={<SecurityIcon />}
            className="w-full"
            onClick={openSecurityCenter}
          >
            Go to security center
          </DarkButton>
        </div>
      )}
    </DetailContainer>
  );
};
