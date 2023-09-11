"use client";
import { MasterPasswordInput } from "@components/security/MasterPasswordInput";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC } from "react";

const BindEmailPassword: FC = () => {
  const { mounted } = useMounted();
  const [authUser] = useBehaviorSubject(authUser$());
  const securityFeature = authUser?.get("security");
  const { showSuccessToast } = useToast();
  const router = useRouter();

  const bindPassword = async (password: string): Promise<void> => {
    const bound = await securityFeature.bindPassword(password);
    if (bound) {
      showSuccessToast("Master password successfully created");

      // Go to dashboard after a while
      setTimeout(() => {
        router.replace("/dashboard");
      }, 2000);
    }
  }

  return (<div className="col-span-full">
    <Typography variant="h4">Your master password</Typography>
    <p>
      You're almost there. You now need a master password that will be used to lock your identities content. <br />
      Quick takeaways:
    </p>
    <ul className="mt-6">
      <li><b>Our service doesn't store your password</b> in clear, and cannot do anything over your data without your consent.</li>
      <li><b>Don't loose your password</b>, there is no way to recover it.</li>
    </ul>
    <br /><br />
    {mounted && <>
      <Typography variant="h5">Bind a master password</Typography>

      <MasterPasswordInput
        onValidConfirmation={bindPassword}
        title="Create master password" />
    </>}
  </div>)
}

export default BindEmailPassword;