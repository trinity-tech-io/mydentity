"use client";
import { FC, useState, useEffect } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { RegularIdentity } from "@model/regular-identity/regular-identity";
import { IdentityRoot } from "@model/identity-root/identity-root";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { useToast } from "@services/feedback.service";
import { authUser$ } from "@services/user/user.events";
import { IdentityRootDids } from "./components/IdentityRootDids";
import Headline from "@components/layout/Headline";
import SecuritySection from "../security/components/SecuritySection";
import MnemonicBox from "./components/MnemonicBox";

const TAG = "export-mnemonic";
interface Mnemonics {
  [key: string]: string | undefined;
}
const ExportMnemonicPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [exporting, setExporting] = useState<{ [key: string]: boolean }>({});
  const [mnemonics, setMnemonics] = useState<Mnemonics>({});
  const [identities] = useBehaviorSubject(
    activeUser?.get("identity").regularIdentities$
  ); //TODO: Replace with Identities under the Identity root id

  const [identityRoots, setIdentityRoots] = useState<IdentityRoot[] | null>(
    null
  );
  const [hasFetchedIdentityRoots, setHasFetchedIdentityRoots] = useState(false);

  useEffect(() => {
    if (activeUser && !hasFetchedIdentityRoots) {
      const fetchIdentityRoots = async (): Promise<void> => {
        const roots = await activeUser.get("identity").fetchIdentityRoots();
        setIdentityRoots(roots || null);
      };

      fetchIdentityRoots();
      setHasFetchedIdentityRoots(true); // Set to have been refreshed
    }
  }, [activeUser, hasFetchedIdentityRoots]);

  const handleExportMnemonic: (identityRoot: IdentityRoot) => void = async (
    identityRoot
  ) => {
    setExporting((prevState) => ({
      ...prevState,
      [identityRoot.id]: true,
    }));
    const identityRootId = identityRoot.id;
    const mnemonic = await activeUser
      .get("identity")
      .exportMnemonic(identityRootId);

    // Update mnemonics and setShowMnemonic for the corresponding identityRootId
    setMnemonics((prevMnemonics) => ({
      ...prevMnemonics,
      [identityRoot.id]: mnemonic,
    }));
    setExporting((prevState) => ({
      ...prevState,
      [identityRoot.id]: false,
    }));
  };

  if (!mounted) return null;

  // identities grouped by rootIdentityId
  const getRegularIdentitiesById = (
    identities: RegularIdentity[],
    rootIdentityId: string
  ): RegularIdentity[] => {
    const filteredRootIdentities = identities.filter((rootIdentity) => {
      return rootIdentity.identityRootId === rootIdentityId;
    });
    return filteredRootIdentities;
  };

  /**
   * regular type + null creatingAppIdentity = normal identity created by the user in the app
   * regular type + non null creatingAppIdentity = ideitnty created through the SDK and claimed
   * application type = developers page app did
   */
  const groupIdentityName = (identityRoot: IdentityRoot): string => {
    let groupLabel = "";

    for (const identity of identityRoot.Identity) {
      if (identity.type === "REGULAR") {
        groupLabel =
          identity.creatingAppIdentity !== null
            ? "Claimed Identity"
            : "Main Identity group";
        break; // Stop iterating once a regular identity is found
      }
      // else if (identity.type === 'APPLICATION') {
      //   groupLabel = 'Application';
      //   break;  // Stop iterating once an application identity is found
      // }
    }

    return groupLabel || ""; // Return an empty string if no matching condition is found
  };

  return (
    <div>
      <Headline
        title="Export Mnemonics"
        description="Easily organize and export your identities by grouping them as needed. To ensure their safety, it's essential to securely store the mnemonics
        in a designated and protected location."
        showBg={true}
      />
      <Grid container spacing={3}>
        {identityRoots?.map((identityRoot, groupIndex) => {
          // 1. Get the identities for the corresponding rootIdentityId
          const correspondingIdentities = getRegularIdentitiesById(
            identities,
            identityRoot.id
          );
          const showGroupName = groupIdentityName(identityRoot);
          return (
            <Grid key={groupIndex} item xs={12} md={6}>
              <SecuritySection
                className="h-full"
                icon={<ReactIcon icon="ic:round-credit-card" />}
                title={showGroupName}
                statusTitle={`EXPORT CREDENTIALS NOT SUPPORTED YET. COMING SOON`}
                isSet={false}
                actionTitle={"EXPORT MNEMONICS"}
                disabledAction={!!mnemonics[identityRoot.id]}
                actionInProgress={exporting[identityRoot.id] || false}
                handleAction={(): void => {
                  handleExportMnemonic(identityRoot);
                }}
              >
                <Stack spacing={2} sx={{ mt: 1 }}>
                  {!!mnemonics[identityRoot.id] && (
                    <MnemonicBox mnemonic={mnemonics[identityRoot.id]} />
                  )}

                  {/* Display all Identities under the Identity root id */}
                  <Stack spacing={2}>
                    <IdentityRootDids
                      identities={correspondingIdentities}
                      disableCopyDID={!!mnemonics[identityRoot.id]}
                    />
                  </Stack>
                </Stack>
              </SecuritySection>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ExportMnemonicPage;
