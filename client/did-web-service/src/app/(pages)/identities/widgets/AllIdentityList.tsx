'use client';
import { MainButton } from '@components/generic/MainButton';
import { IdentityCellLeft } from '@components/identity/IdentityCellLeft';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import { activeIdentity$ } from '@services/identity/identity.events';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from "next/navigation";
import { FC, useState } from 'react';

const TAG = 'IdentityListWidget'

export const AllIdentityList: FC = _ => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  const router = useRouter()
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [showToast, setShowToast] = useState<boolean>(false);
  const sortedIdentities = [...identities].sort((a, b) => {
    const dateA = new Date(a.lastUsedAt$.getValue()).getTime();
    const dateB = new Date(b.lastUsedAt$.getValue()).getTime();
    return dateB - dateA
  });

  const handleCellClick = (identity: Identity): void => {
    if (identity !== activeIdentity) {
      setShowToast(true)
    }
    else {
      setShowToast(false)
    }
    identityService.setActiveIdentity(identity);
    router.push("/profile");
  }

  const openCreateIdentity = (): void => {
    router.push("/new-identity");
  }

  return (
    <div className="col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">My Identities</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full" style={{ tableLayout: 'fixed' }}>
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
              <tr>
                <th className="p-0 whitespace-nowrap" style={{ width: '63%' }}>
                  <div className="font-semibold text-left">Identity</div>
                </th>
                <th className="p-2 whitespace-nowrap" style={{ width: '30%' }}>
                  <div className="font-semibold text-left">last used</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div>

        {/* Table body */}
        {!sortedIdentities && <VerticalStackLoadingCard />}
        {
          sortedIdentities?.length === 0 && <div className='text-center m-4 flex flex-col'>
            No identity yet.
            <MainButton onClick={openCreateIdentity} className="mt-4">Create my first identity</MainButton>
          </div>
        }
        {
          sortedIdentities?.length > 0 &&
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {
                  sortedIdentities.map(identity => {
                    return (
                      <tr key={identity.did}
                        className="hover:bg-gray-100 hover:text-black dark:hover:bg-slate-500 dark:hover:text-slate-1000 cursor-pointer"
                        onClick={(): void => handleCellClick(identity)}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800 dark:text-slate-100">
                              <IdentityCellLeft identity={identity} show={showToast} />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{identity.lastUsedAt$.getValue().toLocaleDateString()}</div>
                        </td>
                      </tr>)
                  })
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}
