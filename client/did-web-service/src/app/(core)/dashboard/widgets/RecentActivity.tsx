
import { default as Image01 } from '@assets/images/user-avatar-32.png';
import Image, { StaticImageData } from 'next/image';
import { FC } from 'react';

type RecentActivity = {
  did: string;
  image: StaticImageData;
  app: string;
  activity: string;
}

export const RecentActivityWidget: FC = _ => {
  const activities: RecentActivity[] = [
    {
      did: 'did:elastos:abc',
      image: Image01,
      app: 'Creda',
      activity: "Requested your name and 3 other credentials"
    },
    {
      did: 'did:elastos:xyz',
      image: Image01,
      app: 'Glide',
      activity: "Saved a new credential"
    },
  ];

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent activity</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">App</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">DID</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Activity</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
              {
                activities.map(customer => {
                  return (
                    <tr key={customer.did}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <Image className="rounded-full" src={customer.image} width="40" height="40" alt={customer.app} />
                          </div>
                          <div className="font-medium text-slate-800 dark:text-slate-100">{customer.app}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.did}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.activity}</div>
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
