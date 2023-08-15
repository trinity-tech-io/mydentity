
'use client';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { authUser$ } from '@services/user/user.events';
import { FC } from 'react';

export const IdentityListWidget: FC = _ => {
  const [authUser] = useBehaviorSubject(authUser$);
  let [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  identities = identities?.slice(0, 5);

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">My Identities</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">DID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Creation date</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                  (identities && identities.length>0) && identities.map(identity => {
                  return (
                    <tr key={identity.did}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{identity.did}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{identity.createdAt.toLocaleDateString()}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}
