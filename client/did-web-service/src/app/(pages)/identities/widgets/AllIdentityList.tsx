"use client";
import { FC, useEffect, useState } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { useRouter } from "next13-progressbar";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import Joyride, { CallBackProps } from "react-joyride";
import { IconAvatar } from "@components/feature/DetailLine";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { activeIdentity$ } from "@services/identity/identity.events";
import { identityService } from "@services/identity/identity.service";
import { authUser$ } from "@services/user/user.events";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import { DarkButton } from "@components/button";
import { IdentityCard } from "@components/identity/IdentityCard";
import { LoadingCard } from "@components/loading-skeleton";
import TourTooltip from "@components/tooltip/TourTooltip";

const TAG = "IdentityListWidget";

export const AllIdentityList: FC = (_) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(
    authUser?.get("identity").regularIdentities$
  );
  const router = useRouter();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [runTour, setRunTour] = useState<boolean>(false);
  const sortedIdentities =
    identities &&
    [...identities].sort((a, b) => {
      const dateA = a.lastUsedAt$.getValue().getTime();
      const dateB = b.lastUsedAt$.getValue().getTime();
      return dateB - dateA;
    });

  useEffect(() => {
    if (identities) setTimeout(() => setRunTour(true), 500);
  }, [identities]);

  const handleCellClick = (identity: RegularIdentity): void => {
    if (identity !== activeIdentity) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
    identityService.setActiveIdentity(identity);
    router.push("/profile");
  };

  const openCreateIdentity = (): void => {
    router.push("/new-identity");
  };

  const TourSteps = [
    {
      content: (
        <div>
          For more information about your credentials, just click on the chip.
          This will give you access to additional details for better overview.
        </div>
      ),
      disableBeacon: true,
      disableOverlayClose: true,
      hideCloseButton: true,
      hideFooter: true,
      placement: "top",
      spotlightClicks: true,
      styles: {
        options: {
          zIndex: 10000,
        },
      },
      target: ".card-grid .chip-item:first-child",
      title: "THE CHIP",
    },
  ];
  const tourStepIndex = 0;
  const handleTourCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;
  };

  return (
    <div className="col-span-full">
      <Headline
        title="My Identities"
        description="Here, you can access all of your generated Web3 identities. Simply hover over each “card chip” to reveal additional details and explore
        the wealth of information at your fingertips."
        showBg={true}
      />
      {!!identities && (
        <Joyride
          callback={handleTourCallback}
          continuous
          run={runTour}
          scrollToFirstStep
          showProgress
          showSkipButton
          stepIndex={tourStepIndex}
          steps={TourSteps}
          tooltipComponent={TourTooltip}
          styles={{ options: { arrowColor: "#380976" } }}
        />
      )}
      <div className="p-3">
        <Box className="pb-4 pt-2 flex items-center">
          <IconAvatar>
            <ReactIcon icon="material-symbols:credit-card" />
          </IconAvatar>
          <Typography
            className="flex-1"
            variant="h6"
            fontWeight={600}
            sx={{ ml: 1 }}
          >
            All Identities
          </Typography>
          <div className="flex">
            <OutlinedInputStyled
              id="credential-search"
              size="small"
              placeholder="Search"
              className="mr-4 rounded"
              // onChange={handleFilterByName}
              // inputProps={{ ref: emailInputRef }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
            <DarkButton
              className="rounded"
              startIcon={<AddIcon />}
              onClick={openCreateIdentity}
            >
              CREATE IDENTITY
            </DarkButton>
          </div>
        </Box>
        {!sortedIdentities ? (
          <LoadingCard />
        ) : (
          <>
            {sortedIdentities?.length > 0 ? (
              <Grid container spacing={2} className="card-grid">
                {sortedIdentities.map((identity, _id) => (
                  <Grid item key={_id}>
                    <IdentityCard
                      identity={identity}
                      onClickChip={() => {
                        setRunTour(false);
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant="body1" marginTop={1}>
                No identity found
              </Typography>
            )}
          </>
        )}
      </div>
    </div>
  );
};
