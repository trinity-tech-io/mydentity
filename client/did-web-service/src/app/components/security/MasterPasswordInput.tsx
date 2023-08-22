"use client";
import { MainButton } from "@components/MainButton";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { TextField } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, createRef, useState } from "react";

export const MasterPasswordInput: FC<{
  onValidConfirmation: (password: string) => void;
  title: string;
}> = ({ onValidConfirmation, title }) => {
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [binding, setBinding] = useState(false);
  const { showSuccessToast } = useToast();
  const router = useRouter();

  const newPasswordRef = createRef<HTMLInputElement>()
  const confirmPasswordRef = createRef<HTMLInputElement>()

  const bindPassword = async () => {
    const newPassword = newPasswordRef.current.value;
    setBinding(true);
    const bound = await securityFeature.bindPassword(newPassword);
    if (bound) {
      showSuccessToast("Master password successfully created");

      // Go to dashboard after a while
      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
    }
  }

  const refreshPasswordValidity = () => {
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    setPasswordIsValid(newPassword.length > 0 && newPassword === confirmPassword);
  }

  return (
    <div className="flex flex-row mt-4 gap-2">
      <TextField
        label="New password"
        inputRef={newPasswordRef}
        variant="outlined"
        size="small"
        onChangeCapture={refreshPasswordValidity}
      />
      <TextField
        label="Confirm password"
        inputRef={confirmPasswordRef}
        variant="outlined"
        size="small"
        onChangeCapture={refreshPasswordValidity}
      />
      <MainButton onClick={bindPassword} busy={binding} disabled={!passwordIsValid}>{title}</MainButton>
    </div>
  )
}