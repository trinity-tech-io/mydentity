"use client";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { IdentityRoot } from "@model/identity-root/identity-root";
import { authUser$ } from '@services/user/user.events';
import { useToast } from "@services/feedback.service";
import React, { FC, useState } from 'react';
import { Typography } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';

const TAG = "export-mnemonic";
interface ClickedMnemonics {
  [key: string]: string | undefined;
}
const ExportMnemonicPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [rootIdentities] = useBehaviorSubject(activeUser?.get("identity").rootIdentities$);
  const [clickedMnemonics, setClickedMnemonics] = useState<ClickedMnemonics>({});
  const { showSuccessToast, showErrorToast } = useToast();

  const handleExportMnemonic: (rootIdentity: IdentityRoot) => Promise<string> = async (rootIdentity) => {
    const identityRootId= rootIdentity.id;
    const mnemonic = await rootIdentity?.exportMnemonic(identityRootId);
    setClickedMnemonics((prevMnemonics) => ({
      ...prevMnemonics,
      [rootIdentity.id]: mnemonic,
    }));

    return Promise.resolve(mnemonic);
  };

  if (!mounted) return null;

  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Identity groups</h2>
      </header>
      <div className="p-3">
        {rootIdentities?.map((rootIdentityGroup, groupIndex) => (
          <div key={groupIndex}>
            <Typography variant="h6" sx={{ mt: 3 }}>
              Identity Group {groupIndex + 1}
            </Typography>
            {[rootIdentityGroup].map((rootIdentity, index) => (
              <div key={index} className="my-3">
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-left">Identity root id: {rootIdentity.id}</div>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-2 rounded"
                    onClick={() => handleExportMnemonic(rootIdentity)}
                  >
                    Export this mnemonic
                  </button>
                </div>
                {clickedMnemonics[rootIdentity.id] && (
                  <Typography
                    variant="body2"
                    onClick={() => {
                      navigator.clipboard.writeText(clickedMnemonics[rootIdentity.id]);
                      showSuccessToast('Mnemonic copied to clipboard.');
                    }}
                    sx={{
                      textDecoration: 'none', // none/underline
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'blue',
                      },
                    }}
                  >
                    Mnemonic: {clickedMnemonics[rootIdentity.id]}
                    <FileCopyIcon style={{ fontSize: 16, marginLeft: 5 }} />
                  </Typography>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportMnemonicPage;
