'use client';
import CircleComponent from '@components/CircleComponent';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import Avatar from '@mui/material/Avatar';
import { shortenDID } from '@services/identity/identity.utils';
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from '@services/identity/identity.events';
import { initialsString } from "@utils/strings";
import { FC, useEffect } from 'react';

const IdentityCellLeft: FC<{
  identity: Identity;
  show: boolean; 
}> = ({ identity , show}) => {
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const { showSuccessToast } = useToast()
  const [name] = useBehaviorSubject(identity.get("profile").name$)
 
  useEffect(() => {
    if (show && activeIdentity == identity) {
      const shortDid = shortenDID(identity.did, 8)
      const text = 'Your current active identity is: ' + name + '(' + shortDid + ')'
      showSuccessToast(text);
    }
  }, [show, showSuccessToast, name, activeIdentity, identity]);

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

