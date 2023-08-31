'use client';
import { FC } from 'react';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { authUser$ } from '@services/user/user.events';
import IdentitiesTable from "./IdentitiesTable";

export const IdentityListWidget: FC = _ => {
  const [authUser] = useBehaviorSubject(authUser$());
  let [identities] = useBehaviorSubject(authUser?.get("identity").identities$);

  identities = identities?.slice(0, 5);
  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <IdentitiesTable identities = {identities} />
    </div>
  );
}
