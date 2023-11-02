"use client";
import { FC, useState } from "react";
import { Icon as ReactIcon } from "@iconify/react";
import { Grid, Stack, Typography } from "@mui/material";
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

const TAG = "export-mnemonic";
interface ClickedMnemonics {
  [key: string]: string | undefined;
}
const ExportMnemonicPage: FC = () => {
  const { mounted } = useMounted();
  const [activeUser] = useBehaviorSubject(authUser$);
  const [identityRoots] = useBehaviorSubject(
    activeUser?.get("identity").identityRoots$
  );
  const [clickedMnemonics, setClickedMnemonics] = useState<ClickedMnemonics>(
    {}
  );
  const { showSuccessToast, showErrorToast } = useToast();
  const [identities] = useBehaviorSubject(
    activeUser?.get("identity").regularIdentities$
  ); //TODO: Replace with Identities under the Identity root id
  const [showMnemonic, setShowMnemonic] = useState(false);

  const handleExportMnemonic: (identityRoot: IdentityRoot) => void = async (
    identityRoot
  ) => {
    const identityRootId = identityRoot.id;
    const mnemonic = await activeUser
      .get("identity")
      .exportMnemonic(identityRootId);

    // Update clickedMnemonics and setShowMnemonic for the corresponding identityRootId
    setClickedMnemonics((prevMnemonics) => ({
      ...prevMnemonics,
      [identityRoot.id]: mnemonic,
    }));

    setShowMnemonic(true);
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
                disabledAction={
                  showMnemonic && !!clickedMnemonics[identityRoot.id]
                }
                handleAction={(): void => {
                  handleExportMnemonic(identityRoot);
                }}
              >
                <div>
                  {/* show Mnemonic and copy Mnemonic */}
                  {showMnemonic && clickedMnemonics[identityRoot.id] && (
                    <Typography
                      variant="body2"
                      onClick={(): void => {
                        navigator.clipboard.writeText(
                          clickedMnemonics[identityRoot.id]
                        );
                        showSuccessToast("Mnemonic copied to clipboard.");
                      }}
                      sx={{
                        textDecoration: "none",
                        cursor: "pointer",
                        "&:hover": {
                          color: "blue",
                        },
                      }}
                    >
                      Mnemonic: {clickedMnemonics[identityRoot.id]}
                      <FileCopyIcon style={{ fontSize: 16, marginLeft: 5 }} />
                    </Typography>
                  )}
                </div>

                {/* Display all Identities under the Identity root id */}
                <Stack spacing={2}>
                  <IdentityRootDids identities={correspondingIdentities} />
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
