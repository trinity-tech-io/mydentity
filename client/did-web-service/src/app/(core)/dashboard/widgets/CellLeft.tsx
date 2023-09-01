'use client';
import CircleComponent from '@components/CircleComponent';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import Avatar from '@mui/material/Avatar';
import { shortenDID } from '@services/identity/identity.utils';
import { initialsString } from "@utils/strings";
import { FC } from 'react';

const IdentityCellLeft: FC<{
  identity: Identity;
}> = ({ identity }) => {
  const [name] = useBehaviorSubject(identity.get("profile").name$)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {name !== null ? (
          <CircleComponent text={initialsString(name as string)} />
        ) : (
          <Avatar src={"/assets/images/account.svg"} />
        )}
        <div style={{ width: '100px', marginLeft: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>{name as string}</div>
          {shortenDID(identity.did, 8)}
        </div>
      </div>
    </div>
  );
};

export default IdentityCellLeft;

