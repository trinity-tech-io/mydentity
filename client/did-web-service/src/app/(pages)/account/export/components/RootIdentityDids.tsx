'use client';
import { IdentityAvatar } from '@components/identity/IdentityAvatar';
import { RegularIdentity } from '@model/regular-identity/regular-identity';
import { shortenDID } from '@services/identity/identity.utils';
import { FC } from 'react';

export const RootIdentityDids: FC<{
  identities: RegularIdentity[],
}> = ({ identities }) => {

  return (
    <div>
      {identities.map((identity, index) => (
        <div key={index} className="mb-2 p-3 bg-blue-900 text-white">
          <div className="flex items-center">
            <IdentityAvatar identity={identity} width={40} height={40} />
            <div className="ml-2">
              <div className="text-sm font-bold">
                {identity.profile().name$.value}
              </div>
              <div className="text-left cursor-pointer">
                {shortenDID(identity.did)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
