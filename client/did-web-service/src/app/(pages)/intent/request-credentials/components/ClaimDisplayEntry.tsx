"use client";
import { FC, useEffect, useState } from "react";
import { ClaimDisplayEntry, CredentialDisplayEntry } from "../RequestDetails";
import { CredentialDisplayEntryWidget } from "./CredentialDisplayEntry";
import { TableCell, TableRow, Typography } from "@mui/material";
import { DetailTable } from "@components/generic/DetailTable";

interface Props {
  claimDisplayEntry: ClaimDisplayEntry;
}

export const ClaimDisplayEntryWidget: FC<Props> = (props) => {
  const { claimDisplayEntry } = props;
  const [selectionSummary, setSelectionSummary] = useState("");

  useEffect(() => {
    if (claimDisplayEntry) updateSummary();
  }, [claimDisplayEntry]);

  /**
   * Convenient string format that describes the currenty claim selection status and requirement.
   *
   * min 1 max 1: "x / 1"
   * min 0 max 3: "x / max 3"
   * min 2 max 2: "x / 2"
   * min 2 max 4: "x / min 2, max 4"
   */
  const claimSelectionSummary = (claim: ClaimDisplayEntry): string => {
    const selectedNb = numberOfSelectedCredentialsInClaim(claim);

    if (claim.claimDescription.min === claim.claimDescription.max)
      return `${selectedNb} / ${claim.claimDescription.min}`;
    else {
      if (claim.claimDescription.min === 0)
        return `${selectedNb} / max ${claim.claimDescription.max}`;
      else
        return `${selectedNb} / min ${claim.claimDescription.min}, max ${claim.claimDescription.max}`;
    }
  };

  const numberOfSelectedCredentialsInClaim = (
    claim: ClaimDisplayEntry
  ): number => {
    return claim.matchingCredentials.reduce(
      (acc, c) => (c.selected ? acc + 1 : acc),
      0
    );
  };

  const updateSummary = (): void => {
    const summary = claimSelectionSummary(claimDisplayEntry);
    setSelectionSummary(summary);
  };

  return (
    <DetailTable
      headCells={
        <>
          <TableCell>CREDENTIALS</TableCell>
          <TableCell>SELECTED {selectionSummary}</TableCell>
        </>
      }
      bodyRows={
        claimDisplayEntry &&
        claimDisplayEntry.matchingCredentials &&
        claimDisplayEntry.matchingCredentials.length > 0 ? (
          claimDisplayEntry.matchingCredentials.map(
            (c: CredentialDisplayEntry) => (
              <CredentialDisplayEntryWidget
                key={c.credential.id}
                credentialDisplayEntry={c}
                claimDisplayEntry={claimDisplayEntry}
                updateSummary={updateSummary}
              />
            )
          )
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
    // claimDisplayEntry &&
    // <div key={claimDisplayEntry.claimDescription.reason} className='flex flex-col'>
    //   <div className="flex flex-row p-4">
    //     <div className="flex flex-row p-1"> { claimDisplayEntry.claimDescription.reason } </div>
    //     <div className="absolute right-1 p-1">
    //       { selectionSummary }
    //     </div>
    //   </div>

    //   { claimDisplayEntry.matchingCredentials &&
    //     <List component="nav" aria-label="main mailbox folders">
    //       {
    //         claimDisplayEntry.matchingCredentials.map((c: CredentialDisplayEntry) =>
    //           <div key={c.credential.id} >
    //             <CredentialDisplayEntryWidget credentialDisplayEntry={c} claimDisplayEntry={claimDisplayEntry}
    //               updateSummary={updateSummary}/>
    //             <Divider />
    //           </div>
    //         )
    //       }
    //     </List>
    //   }
    // </div>
  );
};
