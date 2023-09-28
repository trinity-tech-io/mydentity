"use client";
import { CreateIdentity } from "@components/identity-creation/CreateIdentity";
import { useMounted } from "@hooks/useMounted";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { Identity } from "@model/identity/identity";
import { usePostSignInFlow } from "@services/flow.service";
import Headline from "@components/layout/Headline";
import { CardCase, CaseWrapper, LandingCard } from "@components/card";
import clsx from "clsx";

const NewIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const { navigateToPostSignInLandingPage } = usePostSignInFlow();
  const [visibleNextForm, setVisibleNextForm] = useState(false);

  const showProfile = (): void => {
    navigateToPostSignInLandingPage("/profile");
  };

  const onIdentityCreated = async (identity: Identity): Promise<void> => {
    showProfile();
  };

  if (!mounted) return null;

  return (
    <>
      <Headline
        title="Create a new identity"
        description="Creating an identity opens up the door to constructing a credible online persona, complete with authentic credentials, for diverse digital endeavors. To illustrate, envision the virtual card holder as your primary account and the virtual card as your digital identity, where each credential securely resides within the embedded chip."
      />
      <CreateIdentity onIdentityCreated={onIdentityCreated} />
      <div className="w-full flex justify-center py-4">
        <div className="w-1/2 max-w-md">
          <CardCase className="relative w-full md:pb-2">
            <div className="absolute inset-0 p-2">
              <div className="dashed-body w-full h-full rounded-2xl p-1.5">
                <div className="flex flex-col h-full">
                  <div className="basis-[11%] overflow-hidden">
                    <LandingCard className="w-full bg-[#523E21]" />
                  </div>
                  <div className="basis-[50%] overflow-hidden pt-2 relative">
                    <LandingCard className="w-full bg-neutral-950" />
                    <div className="compartment absolute bottom-0" />
                  </div>
                  <div className="basis-[39%] flex items-center">
                    <div className="px-[10%] pb-4 w-full">
                      {/* <FormControlStyled fullWidth>
                        <label
                          htmlFor="holder-name"
                          className="text-white text-[10px]"
                        >
                          ACCOUNT NAME
                        </label>
                        <Input
                          id="holder-name"
                          inputProps={{
                            maxLength: 30,
                          }}
                          startAdornment={
                            <InputAdornment position="start"></InputAdornment>
                          }
                          onChange={handleInputName}
                        />
                      </FormControlStyled> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardCase>
        </div>
      </div>
    </>
  );
};

export default NewIdentityPage;
