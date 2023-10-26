"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { TableCell, TableRow } from "@mui/material";
import { DarkButton } from "@components/button";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { IdentityRow } from "@components/identity/IdentityRow";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { authUser$ } from "@services/user/user.events";
import { useMounted } from "@hooks/useMounted";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";
import { activeIdentity$ } from "@services/identity/identity.events";
import { RegularIdentity } from "@model/regular-identity/regular-identity";

export const IdentityListWidget: FC = (_) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(
    authUser?.get("identity").regularIdentities$
  );
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [myIdentities, setMyIdentites] = useState<RegularIdentity[]>([]);
  const { mounted } = useMounted();
  const router = useRouter();
  useEffect(() => {
    if (identities) {
      setMyIdentites(
        [...identities].sort((a, b) => {
          const dateA = a.lastUsedAt$.getValue().getTime();
          const dateB = b.lastUsedAt$.getValue().getTime();
          return dateB - dateA;
        })
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identities?.length, activeIdentity]);

  const openCreateIdentity = (): void => {
    router.push("/new-identity");
  };

  const handleShowAllClick = (): void => {
    router.push("/identities");
  };

  return (
    <DetailContainer
      className="h-full"
      title="My Identities"
      showAllAction={handleShowAllClick}
    >
      <div className="mb-1">
        <DetailTable
          headCells={
            <>
              <TableCell>IDENTITY</TableCell>
              <TableCell>LAST USED</TableCell>
            </>
          }
          bodyRows={
            mounted && myIdentities ? (
              <>
                {!myIdentities.length ? (
                  <>
                    <TableRow>
                      <TableCell component="th" colSpan={3} align="center">
                        <span className="text-base">No identity yet.</span>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  myIdentities
                    .slice(0, 4)
                    .map((identity, _i) => (
                      <IdentityRow key={_i} identity={identity} />
                    ))
                )}
              </>
            ) : (
              Array(2)
                .fill(0)
                .map((_, _i) => <LoadingTableAvatarRow key={_i} />)
            )
          }
        />
        <div className="w-full mt-2">
          <DarkButton
            startIcon={<AddIcon />}
            onClick={openCreateIdentity}
            className="w-full mt-4"
          >
            CREATE IDENTITY
          </DarkButton>
        </div>
      </div>
    </DetailContainer>
  );
};
