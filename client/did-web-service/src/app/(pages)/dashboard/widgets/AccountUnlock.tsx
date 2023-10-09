import { FC, useEffect, useState } from "react";
import { isNil } from "lodash";
import SecurityIcon from "@mui/icons-material/Security";
import { TableCell } from "@mui/material";
import { useRouter } from "next13-progressbar";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { SecurityState, SecurityStatus } from "../components/SecurityStatus";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { useMounted } from "@hooks/useMounted";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";
import { EncryptAccessRow } from "./account/EncryptAccessRow";
import { DarkButton } from "@components/button";

export const AccountUnlock: FC = (_) => {
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activities] = useBehaviorSubject(
    activeUser?.get("activity").activities$
  );
  const [passkeys] = useBehaviorSubject(
    activeUser?.get("security").passkeyKeys$
  );
  const [passwords] = useBehaviorSubject(
    activeUser?.get("security").passwordKeys$
  );
  const [securityState, setSecurityState] = useState<SecurityState>(
    SecurityState.Unknown
  );
  const [advice, setAdvice] = useState<string>(null);
  const [goToSecurityCenter, setGoToSecurityCenter] = useState(false);
  const { mounted } = useMounted();
  const router = useRouter();

  useEffect(() => {
    setGoToSecurityCenter(false);

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
        setAdvice(
          "Perfect, you will be able to unlock your encrypted data with your password or with your browser."
        );
        return;
      } else {
        // No browser
        setSecurityState(SecurityState.Good);
        setAdvice(
          "All good, you will be able to unlock your encrypted data with your password. You could also bind one or more browsers for faster access"
        );
        return;
      }
    } else {
      // No password
      if (passkeys.length > 0) {
        // At least one passkey
        setSecurityState(SecurityState.Average);
        setAdvice(
          "Only 1 browser bound but no password. You will loose your account if you loose access to the password. Remember that the password cannot be recovered, there is no 'password lost' service."
        );
        setGoToSecurityCenter(true);
        return;
      } else {
        // No passkey
        setSecurityState(SecurityState.Bad);
        setAdvice(
          "No email nor password bound to your account yet, you don't have access to all the features that use encrypted data such as identities."
        );
        setGoToSecurityCenter(true);
        return;
      }
    }

    throw new Error(
      `Unhandled AccountUnlock case, ${passwords?.length} emails, ${passkeys?.length} passkeys`
    );
  }, [passwords, passkeys]);

  const openSecurityCenter = (): void => {
    router.push("/account/security");
  };

  return (
    <DetailContainer
      className="h-full"
      title="Encrypted Content Access"
      able2ShowAll={false}
    >
      <DetailTable
        headCells={
          <>
            <TableCell>DECRYPTION METHOD</TableCell>
            <TableCell>STATUS</TableCell>
          </>
        }
        bodyRows={
          !mounted || isNil(passwords) || isNil(passkeys) ? (
            Array(2)
              .fill(0)
              .map((_, _i) => <LoadingTableAvatarRow key={_i} />)
          ) : (
            <>
              <EncryptAccessRow
                method="password"
                secondaryDetail={
                  passwords?.length > 0 ? "**********" : "No password set"
                }
                isSet={passwords?.length > 0}
              />
              <EncryptAccessRow
                method="biometrics"
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
