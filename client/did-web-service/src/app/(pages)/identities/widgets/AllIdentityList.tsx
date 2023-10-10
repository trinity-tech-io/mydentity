"use client";
import { FC, useState } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { Box, InputAdornment, Typography } from "@mui/material";
import { Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import { IconAvatar } from "@components/feature/DetailLine";
import { MainButton } from "@components/generic/MainButton";
import { IdentityCellLeft } from "@components/identity/IdentityCellLeft";
import Headline from "@components/layout/Headline";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { activeIdentity$ } from "@services/identity/identity.events";
import { identityService } from "@services/identity/identity.service";
import { authUser$ } from "@services/user/user.events";
import OutlinedInputStyled from "@components/input/OutlinedInputStyled";
import { DarkButton } from "@components/button";

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
        title="My Identity"
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
              // onClick={(): void => {
              //   setOpenCreateCredential(true);
              // }}
            >
              CREATE IDENTITY
            </DarkButton>
          </div>
        </Box>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full" style={{ tableLayout: "fixed" }}>
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-0 whitespace-nowrap" style={{ width: "63%" }}>
                  <div className="font-semibold text-left">Identity</div>
                </th>
                <th className="p-2 whitespace-nowrap" style={{ width: "30%" }}>
                  <div className="font-semibold text-left">last used</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div>
        {/* Table body */}
        {!sortedIdentities && <VerticalStackLoadingCard />}
        {sortedIdentities?.length === 0 && (
          <div className="text-center m-4 flex flex-col">
            No identity yet.
            <MainButton onClick={openCreateIdentity} className="mt-4">
              Create my first identity
            </MainButton>
          </div>
        )}
        {sortedIdentities?.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {sortedIdentities.map((identity) => {
                  return (
                    <tr
                      key={identity.did}
                      className="hover:bg-gray-100 hover:text-black dark:hover:bg-slate-500 dark:hover:text-slate-1000 cursor-pointer"
                      onClick={(): void => handleCellClick(identity)}
                    >
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="font-medium text-slate-800 dark:text-slate-100">
                            <IdentityCellLeft
                              identity={identity}
                              show={showToast}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">
                          {identity.lastUsedAt$.getValue().toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
