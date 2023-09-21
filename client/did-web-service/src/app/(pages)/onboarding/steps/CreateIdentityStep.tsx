import { CreateIdentity } from "@components/identity-creation/CreateIdentity";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { Typography } from "@mui/material";
import { usePostSignInFlow } from "@services/flow.service";
import { authUser$ } from "@services/user/user.events";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export const CreateIdentityStep: FC = () => {
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$);
  const [userName] = useBehaviorSubject(authUser?.name$);
  const [identityBeingCreated, setIdentityBeingCreated] = useState(false);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();

  const onIdentityCreated = (): void => {
    navigateToPostSignInLandingPage();
  }

  const onIdentityCreating = (): void => {
    setIdentityBeingCreated(true);
  }

  return (
    <>
      <Typography variant="h5" className='w-full text-center font-semibold mt-32 mb-24 leading-9'>
        Let's create a first identity
      </Typography>

      <CreateIdentity suggestedName={userName} onIdentityCreating={onIdentityCreating} onIdentityCreated={onIdentityCreated} />

      {!identityBeingCreated &&
        <div className="flex flex-row justify-center mt-10">
          <a className="cursor-pointer" onClick={() => navigateToPostSignInLandingPage()}>I'll do this later, just taking a first look for now.</a>
        </div>
      }
    </>
  )
}