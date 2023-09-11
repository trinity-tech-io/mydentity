'use client';
import { VerticalStackLoadingCard } from '@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { Identity } from '@model/identity/identity';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { activeIdentity$ } from '@services/identity/identity.events';
import { identityService } from '@services/identity/identity.service';
import { authUser$ } from '@services/user/user.events';
import { useRouter } from "next/navigation";
import { FC, MouseEvent, useState } from 'react';
import IdentityCellLeft from './CellLeft';

const TAG = 'IdentityListWidget'

export const IdentityListWidget: FC = _ => {
  const [authUser] = useBehaviorSubject(authUser$());
  let [identities] = useBehaviorSubject(authUser?.get("identity").identities$);
  const router = useRouter()
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [showToast, setShowToast] = useState<boolean>(false);
  identities = identities?.slice(0, 5);

  const handleCellClick = (identity: Identity): void => {
    if (identity !== activeIdentity) {
      setShowToast(true)
    }
    else {
      setShowToast(false)
    }
    identityService.setActiveIdentity(identity);
    router.replace("/profile");
  }

  const onDeleteClicked = (event: MouseEvent, identity: Identity): void => {
    event.stopPropagation(); // Prevent event propagation to the cell
    event.preventDefault(); //
    router.push("/delete-identity");
  }

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
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
                <th className="p-0 whitespace-nowrap" style={{ width: '54%' }}>
                  <div className="font-semibold text-left">Identity</div>
                </th>
                <th className="p-2 whitespace-nowrap" style={{ width: '30%' }}>
                  <div className="font-semibold text-left">Create Date</div>
                </th>
                <th className="p-0 whitespace-nowrap">
                  <div className="font-semibold text-right">Action</div>
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div>

        {/* Table body */}
        {!identities && <VerticalStackLoadingCard />}
        {
          identities &&
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
                {
                  identities.map(identity => {
                    return (
                      <tr key={identity.did}
                        className="hover:bg-gray-100 hover:text-black dark:hover:bg-slate-500 dark:hover:text-slate-1000"
                        onClick={(): void => handleCellClick(identity)}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="font-medium text-slate-800 dark:text-slate-100">
                              <IdentityCellLeft identity={identity} show={showToast} />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-left">{identity.createdAt.toLocaleDateString()}</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <div className="text-right">
                            <IconButton aria-label="delete" onClick={(e): void => onDeleteClicked(e, identity)}>
                              <DeleteIcon style={{ color: 'red' }} />
                            </IconButton>
                          </div>
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
