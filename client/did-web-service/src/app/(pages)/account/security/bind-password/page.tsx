"use client";
import { FC, useRef, useState } from "react";
import { useRouter } from "next13-progressbar";
import { CircularProgress, FormHelperText, InputLabel } from "@mui/material";
import PasswordInput from "@/app/(pages)/register/components/PasswordInput";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { CardCase } from "@components/card";
import AccountForm from "@components/form/AccountForm";
import Headline from "@components/layout/Headline";
import { MasterPasswordInput } from "@components/security/MasterPasswordInput";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import {
  SecurityState,
  SecurityStatus,
} from "@/app/(pages)/dashboard/components/SecurityStatus";
import { DarkButton } from "@components/button";

const BindPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$);
  const securityFeature = authUser?.get("security");
  const [shadowKeys] = useBehaviorSubject(securityFeature?.shadowKeys$); // KEY THIS to lazily fetch the shadow keys
  const isPasswordBound = securityFeature?.isPasswordBound();
  const [password, setPassword] = useState({ pw: "", confirm: "" });
  const [validationState, setValidationState] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);
  const { showSuccessToast, showErrorToast } = useToast();
  const router = useRouter();
  const pwInputRef = useRef(null);
  const confirmPwInputRef = useRef(null);
  const enabledButtonState =
    password.pw.length > 0 && password.pw === password.confirm;

  const handlePassword =
    (field: "pw" | "confirm") => (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword((prev) => {
        const temp = { ...prev };
        temp[field] = e.target.value;
        return temp;
      });
    };

  const bindPassword: React.MouseEventHandler = async () => {
    setValidationState(true);
    if (pwInputRef.current.value !== confirmPwInputRef.current.value) return;

    setIsInProgress(true);
    try {
      // Unlock the master key first, and bind only if unlock is successful.
      if (await securityFeature.ensureMasterKeyUnlocked()) {
        // Call the bind password API, fail if master key got unlocked for some reason since we just unlocked it.
        // Do NOT repeatingly retry
        const bound = await securityFeature.bindPassword(password.pw);
        if (bound) {
          showSuccessToast("Master password set successfully");
          setTimeout(() => {
            router.push("/account/security");
          }, 500);
        }
      } else {
        showErrorToast(
          `${isPasswordBound ? "Updating" : "Creating"} password failed`
        );
      }
      setIsInProgress(false);
    } catch (e) {
      showErrorToast(
        `${isPasswordBound ? "Updating" : "Creating"} password failed`
      );
    }
  };

  if (!mounted || !authUser || !shadowKeys) return <CircularProgress />;

  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["security-center", "bind-password"]} /> */}
      <Headline
        title="Password Manager"
        description="To create a strong password, use a combination of upper and lower case letters, numbers, and special characters. Avoid easily guessable information,
        consider using passphrases, and use different passwords for different accounts. Regularly update your passwords to enhance security."
        showBg={true}
      />
      <div className="max-w-lg m-auto">
        <CardCase className="relative w-full md:pb-2">
          <div className="absolute inset-0 p-2">
            <div className="dashed-body w-full h-full rounded-2xl p-1.5">
              <div className="px-6 py-8 w-full h-full">
                <div className="flex flex-col gap-5 h-full justify-center">
                  <AccountForm fullWidth>
                    <InputLabel htmlFor="pw">PASSWORD</InputLabel>
                    <PasswordInput
                      outerProps={{ onChange: handlePassword("pw") }}
                      inputProps={{ ref: pwInputRef }}
                    />
                  </AccountForm>
                  <AccountForm
                    error={validationState && password.pw !== password.confirm}
                    fullWidth
                  >
                    <InputLabel htmlFor="confirm-pw">
                      CONFIRM PASSWORD
                    </InputLabel>
                    <PasswordInput
                      outerProps={{
                        id: "confirm-pw",
                        color: "warning",
                        onChange: handlePassword("confirm"),
                      }}
                      inputProps={{ ref: confirmPwInputRef }}
                    />
                    <FormHelperText>
                      Confirm password is incorrect!
                    </FormHelperText>
                  </AccountForm>
                  <div className="py-2">
                    <SecurityStatus
                      state={SecurityState.Bad}
                      advice="Important reminder: There is no way to retrieve or recover this password later. Please keep it securely stored for your account's safety."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardCase>
        <div className="w-full p-[5%]">
          <DarkButton
            className="w-full"
            disabled={!enabledButtonState}
            loading={isInProgress}
            onClick={bindPassword}
          >
            {isPasswordBound ? "UPDATE PASSWORD" : "CREATE PASSWORD"}
          </DarkButton>
        </div>
      </div>
      {/* {mounted && (
        <>
          <MasterPasswordInput
            onValidConfirmation={bindPassword}
            title={
              isPasswordBound
                ? "Update master password"
                : "Create master password"
            }
          />
        </>
      )} */}
    </div>
  );
};

export default BindPassword;
