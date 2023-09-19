'use client';
import { IdentityAvatar } from '@components/identity/IdentityAvatar';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import { useToast } from "@services/feedback.service";
import { activeIdentity$ } from '@services/identity/identity.events';
import { shortenDID } from '@services/identity/identity.utils';
import { FC, useEffect } from 'react';

export const IdentityCellLeft: FC<{
  identity: Identity;
  show: boolean;
}> = ({ identity, show }) => {
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
        <IdentityAvatar identity={identity} width={40} height={40} />
        <div style={{ width: '100px', marginLeft: '8px' }}>
          <div style={{ fontWeight: 'bold' }}>{name as string}</div>
          {shortenDID(identity.did, 8)}
        </div>
      </div>
    </div>
  );
};

