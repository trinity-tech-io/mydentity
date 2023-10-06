"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import { TableCell, TableRow } from "@mui/material";
import { DarkButton } from "@components/button";
import DetailContainer from "@components/generic/DetailContainer";
import { DetailTable } from "@components/generic/DetailTable";
import { MainButton } from "@components/generic/MainButton";
import { IdentityCellLeft } from "@components/identity/IdentityCellLeft";
import { IdentityRow } from "@components/identity/IdentityRow";
import { VerticalStackLoadingCard } from "@components/loading-cards/vertical-stack-loading-card/VerticalStackLoadingCard";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { activeIdentity$ } from "@services/identity/identity.events";
import { identityService } from "@services/identity/identity.service";
import { authUser$ } from "@services/user/user.events";
import { useMounted } from "@hooks/useMounted";
import { TableAvatarRow } from "@components/loading-skeleton";

const TAG = "IdentityListWidget";

export const IdentityListWidget: FC = (_) => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [identities] = useBehaviorSubject(
    authUser?.get("identity").regularIdentities$
  );
  const { mounted } = useMounted();
  const router = useRouter();
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const [showToast, setShowToast] = useState<boolean>(false);
  const sortedIdentities =
    identities &&
    [...identities].sort((a, b) => {
      const dateA = a.lastUsedAt$.getValue().getTime();
      const dateB = b.lastUsedAt$.getValue().getTime();
      return dateB - dateA;
    });

  const handleCellClick = (identity: RegularIdentity): void => {
    if (identity !== activeIdentity) {
      setShowToast(true);
    } else {
      setShowToast(false);
    }
    identityService.setActiveIdentity(identity);
    router.push("/profile");
  };

  const openCreateIdentity = (): void => {
    router.push("/new-identity");
  };

  const handleShowAllClick = (): void => {
    router.push("/identities");
  };
  return (
    <DetailContainer
      className="h-full"
      title="My Identities"
      showAllAction={handleShowAllClick}
    >
      <div className="mb-1">
        <DetailTable
          headCells={
            <>
              <TableCell>IDENTITY</TableCell>
              <TableCell>CREATED</TableCell>
            </>
          }
          bodyRows={
            mounted && sortedIdentities ? (
              <>
                {!sortedIdentities.length ? (
                  <>
                    <TableRow>
                      <TableCell component="th" colSpan={3} align="center">
                        <span className="text-base">No identity yet.</span>
                      </TableCell>
                    </TableRow>
                  </>
                ) : (
                  sortedIdentities
                    .slice(0, 4)
                    .map((identity, _i) => (
                      <IdentityRow key={_i} identity={identity} />
                    ))
                )}
              </>
            ) : (
              Array(2)
                .fill(0)
                .map((_, _i) => <TableAvatarRow key={_i} />)
            )
          }
        />
        <div className="w-full mt-2">
          <DarkButton
            startIcon={<AddIcon />}
            onClick={openCreateIdentity}
            className="w-full mt-4"
          >
            CREATE IDENTITY
          </DarkButton>
        </div>
      </div>
    </DetailContainer>
    // <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
    //   <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
    //     <h2 className="font-semibold text-slate-800 dark:text-slate-100">My Identities</h2>
    //   </header>
    //   <div className="p-3">
    //     {/* Table */}
    //     <div className="overflow-x-auto">
    //       <table className="table-auto w-full" style={{ tableLayout: 'fixed' }}>
    //         {/* Table header */}
    //         <thead className="text-xs font-semibold uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50">
    //           <tr>
    //             <th className="p-0 whitespace-nowrap" style={{ width: '63%' }}>
    //               <div className="font-semibold text-left">Identity</div>
    //             </th>
    //             <th className="p-2 whitespace-nowrap" style={{ width: '30%' }}>
    //               <div className="font-semibold text-left">last used</div>
    //             </th>
    //           </tr>
    //         </thead>
    //       </table>
    //     </div>
    //   </div>
    //   <div>

    //     {!sortedIdentities && <VerticalStackLoadingCard />}
    //     {
    //       sortedIdentities?.length === 0 && <div className='text-center m-4 flex flex-col'>
    //         No identity yet.
    //         <MainButton onClick={openCreateIdentity} className="mt-4">Create my first identity</MainButton>
    //       </div>
    //     }
    //     {
    //       sortedIdentities?.length > 0 &&
    //       <div className="overflow-x-auto">
    //         <table className="table-auto w-full">
    //           <tbody className="text-sm divide-y divide-slate-100 dark:divide-slate-700">
    //             {
    //               sortedIdentities.map(identity => {
    //                 return (
    //                   <tr key={identity.did}
    //                     className="hover:bg-gray-100 hover:text-black dark:hover:bg-slate-500 dark:hover:text-slate-1000 cursor-pointer"
    //                     onClick={(): void => handleCellClick(identity)}>
    //                     <td className="p-2 whitespace-nowrap">
    //                       <div className="flex items-center">
    //                         <div className="font-medium text-slate-800 dark:text-slate-100">
    //                           <IdentityCellLeft identity={identity} show={showToast} />
    //                         </div>
    //                       </div>
    //                     </td>
    //                     <td className="p-2 whitespace-nowrap">
    //                       <div className="text-left">{identity.lastUsedAt$.getValue().toLocaleDateString()}</div>
    //                     </td>
    //                   </tr>)
    //               })
    //             }
    //           </tbody>

    //           <tfoot>
    //             <tr>
    //               <td colSpan={2} className="p-3 text-right">
    //                 <div className="flex justify-end">
    //                   <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs py-1 px-2 rounded relative"
    //                     onClick={handleShowAllClick}
    //                   >
    //                     <span>Show all</span>
    //                   </button>
    //                 </div>
    //               </td>
    //             </tr>
    //           </tfoot>
    //         </table>
    //       </div>
    //     }
    //   </div>
    // </div>
  );
};
