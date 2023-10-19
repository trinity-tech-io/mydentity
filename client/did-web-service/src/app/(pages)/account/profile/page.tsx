"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next13-progressbar";
import { Button, Grow, Input, InputAdornment } from "@mui/material";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { DarkButton } from "@components/button";
import { CardCase, LandingCard } from "@components/card";
import AccountForm from "@components/form/AccountForm";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { authUser$ } from "@services/user/user.events";
import { saveAuthUser } from "@services/user/user.service";
import { LoadingAccountName } from "@components/loading-skeleton";
import { useToast } from "@services/feedback.service";

const AccountProfile: FC = () => {
  const [accountName, setAccountName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [authUser] = useBehaviorSubject(authUser$);
  const [userName] = useBehaviorSubject(authUser?.name$);
  const { showErrorToast, showSuccessToast } = useToast();
  const { mounted } = useMounted();
  const router = useRouter();
  const enableUpdate = accountName && accountName !== userName;

  useEffect(() => {
    if (userName) {
      setAccountName(userName);
    }
  }, [userName]);

  const handleInputName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setAccountName(e.target.value);
  };

  const onUpdateUserName = async (): Promise<void> => {
    setIsUpdating(true);
    if (userName === accountName) {
      setIsUpdating(false);
      return;
    }

    if (!authUser) {
      showErrorToast("Please login first.");
      setIsUpdating(false);
      return;
    }

    await authUser.updateUserName(accountName);

    await saveAuthUser(authUser);

    showSuccessToast("Account name successfully updated");
    setIsUpdating(false);
  };

  const onUpdateEmail = () => {
    router.push("/account/security/bind-email");
  }
  return (
    <div className="col-span-full">
      {/* <Breadcrumbs entries={["account-profile"]} /> */}
      <Headline
        title="Account Profile"
        description="You have the flexibility to modify your account profile name at any time, allowing you to adapt and personalize it as often as you prefer to better suit your needs."
        showBg={true}
      />
      <div className="w-full flex justify-center py-4">
        <div className="w-full sm:w-2/3 md:w-3/5 max-w-lg">
          <CardCase className="relative w-full md:pb-2">
            <div className="absolute w-full h-full p-2">
              <div className="dashed-body w-full h-full rounded-2xl p-1.5">
                <div className="flex flex-col h-full">
                  <div className="basis-[11%] overflow-hidden">
                    <LandingCard className="w-full bg-[#523E21]" />
                  </div>
                  <div className="basis-[89%] overflow-hidden pt-2 relative">
                    <LandingCard className="w-full bg-neutral-950" />
                    <div className="compartment-top absolute bottom-[45%]" />
                    <div className="compartment absolute bottom-0 h-[45%] flex items-center">
                      <div className="px-[10%] py-4 w-full">
                        <AccountForm fullWidth>
                          <label
                            htmlFor="holder-name"
                            className="text-white text-[10px] text-center"
                          >
                            ACCOUNT NAME
                          </label>
                          {mounted && authUser ? (
                            <Input
                              id="holder-name"
                              autoFocus
                              defaultValue={authUser.name$.getValue()}
                              inputProps={{
                                maxLength: 30,
                              }}
                              startAdornment={
                                <InputAdornment position="start"></InputAdornment>
                              }
                              onChange={handleInputName}
                            />
                          ) : (
                            <div className="pt-2">
                              <LoadingAccountName />
                            </div>
                          )}
                        </AccountForm>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardCase>
          <div className="flex items-center flex-col gap-4 w-full p-8">
            {mounted && authUser && (
              <Grow in={true}>
                <DarkButton
                  loading={isUpdating}
                  className="w-full"
                  onClick={onUpdateUserName}
                  disabled={!enableUpdate}
                >
                  UPDATE NAME
                </DarkButton>
              </Grow>
            )}
            <Button
              sx={{ color: "#9D3E3E", textDecoration: "underline" }}
              endIcon={<KeyboardArrowRightIcon />}
              onClick={onUpdateEmail}
            >
              Do you wish to update your email address instead?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountProfile;
