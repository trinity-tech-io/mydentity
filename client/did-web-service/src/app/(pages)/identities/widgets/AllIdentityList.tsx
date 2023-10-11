"use client";
import { FC, useState } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { useRouter } from "next13-progressbar";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
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

const TAG = "IdentityListWidget";

export const AllIdentityList: FC = (_) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(
    authUser?.get("identity").regularIdentities$
  );
  const router = useRouter();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [showToast, setShowToast] = useState<boolean>(false);
  const sortedIdentities =
    identities &&
    [...identities].sort((a, b) => {
      const dateA = a.lastUsedAt$.getValue().getTime();
      const dateB = b.lastUsedAt$.getValue().getTime();
      return dateB - dateA;
    });

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

  return (
    <div className="col-span-full">
      <Headline
        title="My Identities"
        description="Here, you can access all of your generated Web3 identities. Simply hover over each “card chip” to reveal additional details and explore
        the wealth of information at your fingertips."
        showBg={true}
      />
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
              <Grid container spacing={2}>
                {sortedIdentities.map((identity, _id) => (
                  <Grid item key={_id}>
                    <IdentityCard identity={identity} />
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
