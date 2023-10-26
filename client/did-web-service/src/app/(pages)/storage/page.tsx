"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next13-progressbar";
import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { Icon as ReactIcon } from "@iconify/react";
import { Breadcrumbs } from "@components/breadcrumbs/Breadcrumbs";
import { DarkButton } from "@components/button";
import Headline from "@components/layout/Headline";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { useMounted } from "@hooks/useMounted";
import { VaultStatus } from "@services/hive/vault/vault-status";
import { activeIdentity$ } from "@services/identity/identity.events";
import { authUser$ } from "@services/user/user.events";
import DetailContainer from "@components/generic/DetailContainer";
import { IconAvatar } from "@components/feature/DetailLine";

/**
 * Hive storage status and setup for the active identity
 */
const StoragePage: FC = () => {
  const { mounted } = useMounted();
  const router = useRouter();
  const [authUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const hiveFeature = activeIdentity?.hive();
  const [vaultStatus] = useBehaviorSubject(hiveFeature?.vaultStatus$);
  const [vaultAddress] = useBehaviorSubject(hiveFeature?.vaultAddress$);
  const [vaultInfo] = useBehaviorSubject(hiveFeature?.vaultInfo$);
  const [storageUsed, setStorageUsed] = useState<string>("");
  const [storageQuota, setStorageQuota] = useState<string>("");

  const getDisplayableStorageSizeMB = (size: number): number => {
    return parseFloat((size / (1024 * 1024)).toFixed(2));
  };

  useEffect(() => {
    if (vaultInfo) {
      setStorageUsed(
        getDisplayableStorageSizeMB(vaultInfo.getStorageUsed()) + " MB"
      );
      setStorageQuota(
        getDisplayableStorageSizeMB(vaultInfo.getStorageQuota()) + " MB"
      );
    }
  }, [vaultInfo]);

  if (!mounted) return null;

  return (
    <div>
      {/* <Breadcrumbs entries={["storage"]} /> */}
      <Headline
        title="Storage"
        description="Your identity has been linked to Elastos Hive Storage, a decentralized network comprising independent servers for data storage. You can opt for
        the default vault provider or utilize your own local vault storage. At present, your hive vault only contains your identity avatar."
        showBg={true}
      />

      <Stack direction="row" spacing={2}>
        <Avatar
          src="/hive-cross.svg"
          sx={{
            width: 80,
            height: 80,
            p: 2,
            background: (theme) => theme.palette.background.paper,
          }}
        />
        <div className="flex flex-col flex-1 justify-center">
          <Typography variant="h4">Elastos Hive Storage</Typography>
          <Typography variant="body2">hivehub.xyz</Typography>
        </div>
        <div>
          <DarkButton startIcon={<ReactIcon icon="tabler:external-link" />}>
            MANAGE MY VAULT
          </DarkButton>
        </div>
      </Stack>

      <DetailContainer
        className="w-full mt-4"
        title={
          <div className="inline-flex items-center">
            <IconAvatar>
              <div className="w-5 h-5 flex items-center">
                <ReactIcon icon="mdi:database" />
              </div>
            </IconAvatar>
            <span className="pl-2">My Vault</span>
          </div>
        }
        able2ShowAll={false}
      >
        <Typography>
          We have associated your identity with an Elastos <b>Hive Storage</b>.
          Hive is a decentralized network of independant servers that store
          data. You can choose to use a default vault provider, or your own
          vault storage at home. For now, only your identity avatar is stored on
          your hive vault.
        </Typography>

        <div className="font-bold mt-4">Hive storage status</div>
        <div>
          {vaultStatus === VaultStatus.NotChecked && "Checking"}
          {vaultStatus === VaultStatus.Subscribing && "Subscribing"}
          {vaultStatus === VaultStatus.ReadyToUse && "Ready to use"}
          {vaultStatus === VaultStatus.UnknownError &&
            "Failed to retrieve status"}
        </div>

        <div className="font-bold mt-4">Information about your vault</div>
        {vaultInfo && (
          <>
            <Grid container spacing={2} sx={{}}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Storage provider:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {vaultAddress}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Max storage:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {storageQuota}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  File storage in use:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {storageUsed}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  Creation date:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ color: "text.secondary" }}>
                  {vaultInfo.getStartTime().toDateString()}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </DetailContainer>

      <Link target="_blank" href="https://hivehub.xyz/" className="mt-4">
        Manage my hive vault on hivehub.xyz
      </Link>
    </div>
  );
};

export default StoragePage;
