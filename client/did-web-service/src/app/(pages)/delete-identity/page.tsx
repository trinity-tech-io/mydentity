"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Stack, Typography } from "@mui/material";
import CardIcon from "@assets/images/card/card.svg";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { IconAvatar } from "@components/feature/DetailLine";
import { MainButton } from "@components/generic/MainButton";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { activeIdentity$ } from "@services/identity/identity.events";
import { identityService } from "@services/identity/identity.service";
import { authUser$ } from "@services/user/user.events";
import { LandingCard } from "@components/card";
import {
  SecurityState,
  SecurityStatus,
} from "../dashboard/components/SecurityStatus";
import GradientTypography from "@components/text/GradientTypography";

const TAG = "delete-identity";

const DeleteIdentityPage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [name] = useBehaviorSubject(activeIdentity?.profile().name$);
  const [lastUsedAt] = useBehaviorSubject(activeIdentity?.lastUsedAt$);
  const [deletingIdentity, setDeletingIdentity] = useState(false);

  const deleteIdentity = async (): Promise<void> => {
    const identityStringToDelete = activeIdentity.did;

    setDeletingIdentity(true);
    // Clear the active identity as we are deleting it
    identityService.setActiveIdentity(null);
    // Go back to dashboard instantly
    router.replace("/dashboard");
    // Deletion
    await activeUser.get("identity").deleteIdentity(identityStringToDelete);
  };

  if (!mounted) return null;

  return (
    <div>
      {/* <Breadcrumbs entries={["delete-identity"]} /> */}
      <Headline
        title="Delete Identity"
        description="You have the option to permanently delete your identity, along with all the associated credentials. It's crucial to note that once deleted, this identity cannot be retrieved or restored."
        showBg={true}
      />
      <div className="inline-flex items-center">
        <IconAvatar>
          <div className="w-4 h-4 flex justify-center">
            <CardIcon />
          </div>
        </IconAvatar>
        <Typography variant="subtitle1" className="pl-2">
          Active Identity
        </Typography>
      </div>
      {activeIdentity && (
        <div className="max-w-md w-full m-auto pt-4">
          <LandingCard
            className="w-full h-auto bg-neutral-950"
            waveIconVisible={false}
            topRightSection={
              <Stack alignItems="end" spacing={0.5}>
                <Box className="rounded-md bg-[#9291A5] text-[7pt] px-3 py-0.5 inline-block">
                  ACTIVE IDENTITY
                </Box>
                {lastUsedAt && (
                  <Typography variant="caption" fontStyle="italic">
                    Last used : {lastUsedAt.toLocaleString()}
                  </Typography>
                )}
              </Stack>
            }
            footer={
              <Typography variant="caption">{activeIdentity.did}</Typography>
            }
          >
            <Stack spacing={2} sx={{ mb: { xs: "3%", sm: "5%" }, mt: -12 }}>
              <SecurityStatus
                state={SecurityState.Bad}
                advice="You are about to delete the active identity and all the associated information (credentials)."
              />
              <div className="flex flex-col">
                <label htmlFor="holder-name" className="text-white text-[10px]">
                  IDENTITY NAME
                </label>
                <GradientTypography variant="h4" fontWeight={600}>
                  {name || "Unnamed application"}
                </GradientTypography>
              </div>
            </Stack>
          </LandingCard>
          {
            <div className="mt-4 px-4">
              <MainButton
                onClick={deleteIdentity}
                busy={deletingIdentity}
                mode="danger"
                className="mt-4"
              >
                Delete this identity
              </MainButton>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default DeleteIdentityPage;
