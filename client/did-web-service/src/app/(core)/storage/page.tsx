"use client";
import { useMounted } from '@hooks/useMounted';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

/**
 * Hive storage status and setup for the active identity
 */
const StoragePage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();

  if (!mounted)
    return null;

  return (<>
    <div></div>
  </>)
}

export default StoragePage;
