'use client';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import React from 'react';
import CircleComponent from '@components/CircleComponent';
import Avatar from '@mui/material/Avatar'; 
import { shortenDID } from '@services/identity/identity.utils';
import { initialsString } from "@utils/strings";

const IdentityCellLeft = ({ identity }) => {
  const [name] = useBehaviorSubject(identity.get("profile").name$) 
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {name !== null ? (
          <CircleComponent text={initialsString(name  as string)} />
        ) : (
          <Avatar src={"/assets/images/account.svg"} />
        )}
        <div style={{ marginLeft: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>{name  as string}</div>
          {shortenDID(identity.did, 8)}
        </div>
      </div>
    </div>
  );
};

export default IdentityCellLeft;

