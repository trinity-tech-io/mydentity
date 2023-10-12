"use client";
import { useBehaviorSubject } from '@hooks/useBehaviorSubject';
import { useMounted } from '@hooks/useMounted';
import { RegularIdentity } from '@model/regular-identity/regular-identity';
import { IdentityRoot } from "@model/identity-root/identity-root";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Typography } from "@mui/material";
import { useToast } from "@services/feedback.service";
import { authUser$ } from '@services/user/user.events';
import { FC, useState } from 'react';
import { IdentityRootDids } from './components/IdentityRootDids';

const TAG = "export-mnemonic";
interface ClickedMnemonics {
  [key: string]: string | undefined;
}
const ExportMnemonicPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [identityRoots] = useBehaviorSubject(activeUser?.get("identity").identityRoots$);
  const [clickedMnemonics, setClickedMnemonics] = useState<ClickedMnemonics>({});
  const { showSuccessToast, showErrorToast } = useToast();
  const [identities] = useBehaviorSubject(activeUser?.get("identity").regularIdentities$);//TODO: Replace with Identities under the Identity root id
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleExportMnemonic: (identityRoot: IdentityRoot) => Promise<string> = async (identityRoot) => {
    const identityRootId = identityRoot.id;
    const mnemonic = await activeUser.get("identity").exportMnemonic(identityRootId);
    setClickedMnemonics((prevMnemonics) => ({
      ...prevMnemonics,
      [identityRoot.id]: mnemonic,
    }));
    if (mnemonic) {
      setShowMnemonic(true);
    }

    return Promise.resolve(mnemonic);
  };

  if (!mounted) return null;

  // identities grouped by rootIdentityId
  const getRegularIdentitiesById = (identities: RegularIdentity[], rootIdentityId: string): RegularIdentity[] => {
    const filteredRootIdentities = identities.filter(rootIdentity => {
      return rootIdentity.identityRootId === rootIdentityId;
    });
    return filteredRootIdentities
  }

  return (
    <div className="flex flex-wrap mt-12">
      {identityRoots?.map((identityRoot, groupIndex) => {
        // 1. Get the identities for the corresponding rootIdentityId
        const correspondingIdentities = getRegularIdentitiesById(identities, identityRoot.id);

        return (
          <div key={groupIndex} className="m-4 mt-11 p-6 border rounded-lg relative w-[800px]">
            <div className="absolute top-0 left-0 font-bold -mt-12 ml-2">
              Identity Group {groupIndex + 1}
            </div>
            <div className="absolute top-0 right-0 -mt-11">
              {/* Get Mnemonic */}
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ${showMnemonic ? 'hidden' : ''}`}
                onClick={() => {
                  handleExportMnemonic(identityRoot);
                }}
              >
                Export Mnemonic
              </button>

              {/* show Mnemonic and copy Mnemonic */}
              {showMnemonic && clickedMnemonics[identityRoot.id] && (
                <Typography
                  variant="body2"
                  onClick={() => {
                    navigator.clipboard.writeText(clickedMnemonics[identityRoot.id]);
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
                  Mnemonic: {clickedMnemonics[identityRoot.id]}
                  <FileCopyIcon style={{ fontSize: 16, marginLeft: 5 }} />
                </Typography>
              )}
            </div>

            {/* Display all Identities under the Identity root id */}
            <div style={{ width: '300px' }}>
              <IdentityRootDids identities={correspondingIdentities} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExportMnemonicPage;
