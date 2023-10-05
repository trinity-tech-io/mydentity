'use client';
import { FC } from 'react';
import { ListItemText, TableCell } from '@mui/material';
import { DetailTableRow } from '@components/generic/DetailTable';
import { IdentityAvatar } from '@components/identity/IdentityAvatar';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { RegularIdentity } from '@model/regular-identity/regular-identity';
import { shortenDID } from '@services/identity/identity.utils';
import { getDateDistance } from '@utils/date';

export const IdentityRow: FC<{
  identity: RegularIdentity;
}> = ({ identity }) => {
  const [name] = useBehaviorSubject(identity.profile().name$)

  return (
    <DetailTableRow
      className="h-[3.5rem]"
      avatar={
        <IdentityAvatar identity={identity} width={36} height={36} />
      }
      rowCells={
        <>
          <TableCell>
            <ListItemText
              className="flex-1"
              primary={
                <span className="font-medium">{name}</span>
              }
              secondary={
                <span className="text-[12px]">{shortenDID(identity.did, 8)}</span>
              }
              sx={{my: 0}}
              primaryTypographyProps={{
                sx: {
                  lineHeight: 1.3
                }
              }}
              secondaryTypographyProps={{
                sx: {
                  lineHeight: 1.2
                }
              }}
            />
          </TableCell>
          <TableCell>{getDateDistance(identity.createdAt)}</TableCell>
        </>
      }
    />
  );
};

