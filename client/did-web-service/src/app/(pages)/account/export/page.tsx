"use client";
import React, { FC, useState } from 'react';
import { useUnlockPromptState } from '@components/security/unlock-key-prompt/UnlockKeyPrompt';
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { Typography } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { RootIdentity } from "@model/root-identity/root-identity";
import { authUser$ } from '@services/user/user.events';
import { useToast } from "@services/feedback.service";
import { RootIdentityDids } from './components/RootIdentityDids';

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
  const [identities] = useBehaviorSubject(activeUser?.get("identity").regularIdentities$);//TODO: Replace with Identities under the Identity root id
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleExportMnemonic: (rootIdentity: RootIdentity) => Promise<string> = async (rootIdentity) => {
    const identityRootId= rootIdentity.id;
    const mnemonic = await rootIdentity?.exportMnemonic(identityRootId);
    setClickedMnemonics((prevMnemonics) => ({
      ...prevMnemonics,
      [rootIdentity.id]: mnemonic,
    }));
    if (mnemonic) {
      setShowMnemonic(true);
    }

    return Promise.resolve(mnemonic);
  };

  if (!mounted) return null;

return (
  <div className="flex flex-wrap mt-12">
    {rootIdentities.map((rootIdentity, groupIndex) => (
      <div key={groupIndex} className="m-4 mt-11 p-6 border rounded-lg relative w-[800px]">
        <div className="absolute top-0 left-0 font-bold -mt-12 ml-2">
          Identity Group {groupIndex + 1}
        </div>
        <div className="absolute top-0 right-0 -mt-11">
        {/* Get Mnemonic  */}
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${showMnemonic ? 'hidden' : ''}`}
          onClick={() => {
          handleExportMnemonic(rootIdentity);
          }}>
          Export Mnemonic
        </button>

        {/* show Mnemonic and copy Mnemonic */}
        {showMnemonic && clickedMnemonics[rootIdentity.id] && (
          <Typography
            variant="body2"
            onClick={() => {
              navigator.clipboard.writeText(clickedMnemonics[rootIdentity.id]);
              showSuccessToast('Mnemonic copied to clipboard.');
            }}
            sx={{
              textDecoration: 'none',
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

        {/* Display all Identities under the Identity root id */}
        <div style={{ width: '300px' }}>
          <RootIdentityDids
            identities={identities}
          />
        </div>

      </div>
    ))}
  </div>
);
};

export default ExportMnemonicPage;
