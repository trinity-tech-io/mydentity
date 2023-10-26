"use client";
import { FC } from "react";
import { ClaimDisplayEntry } from "../RequestDetails";
import { ClaimDisplayEntryWidget } from "./ClaimDisplayEntry";
import ChipIcon from "@assets/images/chip.svg";
import DetailContainer from "@components/generic/DetailContainer";
import { IconAvatar } from "@components/feature/DetailLine";
import { DetailTable } from "@components/generic/DetailTable";
import { TableCell, TableRow, Typography } from "@mui/material";
import { LoadingTableAvatarRow } from "@components/loading-skeleton";

interface Props {
  claimDisplayEntryList: ClaimDisplayEntry[];
}

export const ClaimDisplayEntryListWidget: FC<Props> = (props) => {
  const { claimDisplayEntryList } = props;

  return (
    <DetailContainer
      className="w-full"
      title={
        <div className="inline-flex items-center">
          <IconAvatar>
            <div className="w-4 h-4 flex justify-center">
              <ChipIcon />
            </div>
          </IconAvatar>
          <span className="pl-2">Credentials Request</span>
        </div>
      }
      able2ShowAll={false}
    >
      <div className="mb-1">
        {claimDisplayEntryList && claimDisplayEntryList.length > 0 ? (
          claimDisplayEntryList.map((cl, _id) => (
            <ClaimDisplayEntryWidget key={_id} claimDisplayEntry={cl} />
          ))
        ) : (
          <DetailTable
            headCells={
              <>
                <TableCell>CREDENTIALS</TableCell>
                <TableCell>SELECT</TableCell>
              </>
            }
            bodyRows={
              !claimDisplayEntryList ? (
                Array(3)
                  .fill(0)
                  .map((_, _i) => <LoadingTableAvatarRow key={_i} />)
              ) : (
                <TableRow>
                  <TableCell component="th" colSpan={6} align="center">
                    <Typography variant="body1" color="text.primary">
                      No credential found
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            }
          />
        )}
      </div>
    </DetailContainer>
  );
};
