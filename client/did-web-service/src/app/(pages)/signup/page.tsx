"use client";
import { MainButton } from "@components/generic/MainButton";
import { TextField, Typography } from "@mui/material";
import { signOut, signUp } from "@services/user/user.service";
import { useRouter } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

const SignUp: FC = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [canSignIn, setCanSignIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const router = useRouter();

  const onSignUp = async (): Promise<void> => {
    setSigningUp(true);

    const createdUser = await signUp(name);
    if (createdUser) {
      // After sign up, create the first shadow key based on the given password, so we can create a first identity just after.
      const passwordBound = await createdUser.get("security").bindPassword(password);
      if (passwordBound) {
        // All good, go to on boarding
        router.push("/onboarding");
      }
      else {
        // Something wrong happened, sign out from the failing attempt
        // TODO: Show feedback to user
        signOut();
        setSigningUp(false);
      }
    }
    else
      setSigningUp(false);
  }

  const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setName(event.currentTarget?.value);
  };

  const onPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.currentTarget?.value);
  };

  const onPasswordRepeatChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPasswordRepeat(event.currentTarget?.value);
  };

  useEffect(() => {
    setCanSignIn(name?.trim() && password && passwordRepeat && password === passwordRepeat);
  }, [name, password, passwordRepeat]);

  return (
    <div className="col-span-full xl:col-span-6">
      <Typography variant="h5" className='w-full text-center font-bold mt-32 mb-24 leading-9'>
        Welcome! Create your main account
      </Typography>

      <Typography className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        We only need your name and a password for now. We'll show your right after how to secure your account and your identities.
      </Typography>

      <div className="flex flex-col mt-4 gap-4">
        <TextField label="How should we call you?" onChange={onNameChange} disabled={signingUp} variant="outlined" size="small" />
        <TextField label="Password" onChange={onPasswordChange} disabled={signingUp} variant="outlined" size="small" />
        <TextField label="Confirm password" onChange={onPasswordRepeatChange} disabled={signingUp} variant="outlined" size="small" />
        <MainButton onClick={onSignUp} busy={signingUp} disabled={!canSignIn}>Create a user account</MainButton>
      </div>
    </div>
  )
}

export default SignUp;