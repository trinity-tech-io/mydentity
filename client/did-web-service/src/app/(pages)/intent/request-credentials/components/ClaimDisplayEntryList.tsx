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
        <DetailTable
          headCells={
            <>
              <TableCell>PROFILE CREDENTIALS</TableCell>
              <TableCell>SELECTED</TableCell>
            </>
          }
          bodyRows={
            claimDisplayEntryList ? (
              <>
                {!claimDisplayEntryList.length ? (
                  <TableRow>
                    <TableCell component="th" colSpan={6} align="center">
                      <Typography variant="body1" color="text.primary">
                        No credential found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  claimDisplayEntryList.map((cl, _id) => (
                    <ClaimDisplayEntryWidget key={_id} claimDisplayEntry={cl} />
                  ))
                )}
              </>
            ) : (
              Array(3)
                .fill(0)
                .map((_, _i) => <LoadingTableAvatarRow key={_i} />)
            )
          }
        />
      </div>
    </DetailContainer>
    // <div className="col-span-full p-2 xl:col-span-5 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    //   List of credentials
    //   <Divider />
    //   <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
    //     { claimDisplayEntryList &&
    //       <List component="nav" aria-label="main mailbox folders">
    //         {
    //           claimDisplayEntryList.map(cl =>
    //             <div key={cl.claimDescription.reason} className='flex flex-col flex-1'>
    //               <ClaimDisplayEntryWidget claimDisplayEntry={cl} />
    //             </div>
    //           )
    //         }
    //       </List>
    //     }
    //   </Box>
    // </div>
  );
};
