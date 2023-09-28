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
import { CardCase, LandingCard } from "@components/card";
import DetailLine from "@components/feature/DetailLine";
import ChipIcon from "@assets/images/chip.svg";
import CardIcon from "@assets/images/card/card.svg";
import IdentityCaseIcon from "@assets/images/identity-case.svg";

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
        <div className="flex flex-col max-w-sm flex-1">
          <DetailLine
            icon={
              <div className="w-4 h-4 flex justify-center">
                <ChipIcon />
              </div>
            }
            title="THE CHIP"
            description="Your credentials, such as your date of birth and country, are accessible within your identity."
          />
          <div className="flex-1" />
          <DetailLine
            icon={
              <div className="w-4 h-4 flex justify-center">
                <IdentityCaseIcon width="100%" />
              </div>
            }
            title="THE CARD HOLDER"
            description="This serves as your primary account
            for managing all your identities."
          />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
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
        <div className="flex-1 max-w-sm">
          <DetailLine
            className="text-right"
            icon={
              <div className="w-4 h-4 flex justify-center">
                <CardIcon />
              </div>
            }
            title="THE IDENTITY CARD"
            description="The virtual card represents your
            unique identity. You can generate
             multiple identities to meet
             your needs and purposes."
          />
        </div>
      </div>
    </>
  );
};

export default NewIdentityPage;
