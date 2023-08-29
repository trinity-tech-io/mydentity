"use client";
import { MainButton } from "@components/generic/MainButton";
import { TextField, Typography } from "@mui/material";
import { signUp } from "@services/user/user.service";
import { useRouter } from "next/navigation";
import { FC, createRef, useState } from "react";

export const dynamic = "force-dynamic";

const SignUp: FC = () => {
  const userNameRef = createRef<HTMLInputElement>();
  const [signUpBusy, setSignUpBusy] = useState(false);
  const router = useRouter();

  const onSignUp = async () => {
    const name = userNameRef.current.value;
    if (!name || name.trim() === '') {
      alert('user name must be provided.');
      return;
    }

    setSignUpBusy(true);
    const signedUp = await signUp(name);

    if (signedUp)
      router.push("/onboarding");
    else
      setSignUpBusy(false);
  }

  return (
    <div className="col-span-4">
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        Welcome! Create your first user
      </Typography>

      <div className="flex flex-col mt-4 gap-4">
        <TextField
          label="How should we call you?"
          inputRef={userNameRef}
          variant="outlined"
          size="small"
        />
        <MainButton onClick={onSignUp} busy={signUpBusy}>Create a user account</MainButton>
      </div>
    </div>
  )
}

export default SignUp;