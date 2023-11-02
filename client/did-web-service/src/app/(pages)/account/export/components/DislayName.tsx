'use client';
import { RegularIdentity } from '@model/regular-identity/regular-identity';
import React, { FC, useState, useEffect } from 'react';

export const DislayName: FC<{
  identity: RegularIdentity,
}> = ({ identity }) => {
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const subscription = identity.profile().name$.subscribe((value) => {
      setName(value);
    });

    return () => {
      // Unsubscribe when component is unmounted
      subscription.unsubscribe();
    };
  }, [identity]);

  return (
    <>
      {name}
    </>
  );
};
