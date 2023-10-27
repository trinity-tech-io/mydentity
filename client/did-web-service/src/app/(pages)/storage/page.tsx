"use client";
import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, Box, LinearProgress, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
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
import PassStateLabel from "@components/generic/PassStateLabel";
import { LoadingOneLineText } from "@components/loading-skeleton";

const VaultStatusText = {
  [VaultStatus.NotChecked]: "Checking",
  [VaultStatus.Subscribing]: "Subscribing",
  [VaultStatus.ReadyToUse]: "Ready to use",
  [VaultStatus.UnknownError]: "Failed to retrieve status",
};

const StorageProgress = styled(LinearProgress)(({ theme, value }) => ({
  height: 24,
  borderRadius: 5,
  "& .MuiLinearProgress-bar": {
    borderRadius: 5,
    background: `linear-gradient(90deg, #34A853 ${100 - value}%, #9D3E3E ${
      200 - value
    }%)`,
  },
}));

/**
 * Hive storage status and setup for the active identity
 */
const StoragePage: FC = () => {
  const [authUser] = useBehaviorSubject(authUser$);
  const [activeIdentity] = useBehaviorSubject(activeIdentity$);
  const hiveFeature = activeIdentity?.hive();
  const [vaultStatus] = useBehaviorSubject(hiveFeature?.vaultStatus$);
  const [vaultAddress] = useBehaviorSubject(hiveFeature?.vaultAddress$);
  const [vaultInfo] = useBehaviorSubject(hiveFeature?.vaultInfo$);
  const [storageUsed, setStorageUsed] = useState<number>(0);
  const [storageQuota, setStorageQuota] = useState<number>(0);

  const getDisplayableStorageSizeMB = (size: number): number => {
    return parseFloat((size / (1024 * 1024)).toFixed(2));
  };

  useEffect(() => {
    if (vaultInfo) {
      setStorageUsed(getDisplayableStorageSizeMB(vaultInfo.getStorageUsed()));
      setStorageQuota(getDisplayableStorageSizeMB(vaultInfo.getStorageQuota()));
    }
  }, [vaultInfo]);

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
          <Link target="_blank" href="https://hivehub.xyz/" passHref={true}>
            <DarkButton startIcon={<ReactIcon icon="tabler:external-link" />}>
              MANAGE MY VAULT
            </DarkButton>
          </Link>
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
        topRightSection={
          <Stack alignItems="end" spacing={1}>
            {vaultStatus != null && (
              <PassStateLabel
                isPassed={vaultStatus === VaultStatus.ReadyToUse}
                title={VaultStatusText[vaultStatus]}
              />
            )}
            {vaultInfo && (
              <Typography
                variant="caption"
                color="text.primary"
                fontStyle="italic"
              >
                Created : {vaultInfo.getStartTime().toLocaleString()}
              </Typography>
            )}
          </Stack>
        }
        sx={{ ".card-header": { paddingBottom: 0 } }}
      >
        <Stack spacing={2}>
          <div>
            <Typography variant="subtitle1">Storage provider</Typography>
            {vaultAddress != null ? (
              <Typography variant="body2">{vaultAddress}</Typography>
            ) : (
              <Box sx={{ maxWidth: 200 }}>
                <LoadingOneLineText />
              </Box>
            )}
          </div>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Storage size in use</Typography>
            <Stack direction="row" alignItems="end">
              {vaultInfo ? (
                <>
                  <Typography variant="h2" sx={{ lineHeight: 1 }}>
                    {storageUsed} MB
                  </Typography>
                  <Typography variant="body2" sx={{ ml: "auto" }}>
                    Max Size : {storageQuota} MB
                  </Typography>
                </>
              ) : (
                <>
                  <Box sx={{ width: 100 }}>
                    <LoadingOneLineText height={48} />
                  </Box>
                  <Box sx={{ width: 100, ml: "auto", lineHeight: 1 }}>
                    <LoadingOneLineText />
                  </Box>
                </>
              )}
            </Stack>
            {vaultInfo ? (
              <StorageProgress
                variant="determinate"
                value={(100 * storageUsed) / (storageQuota || 1)}
                sx={{ height: 24, background: "#5a5a5aa8" }}
              />
            ) : (
              <LoadingOneLineText height={24} />
            )}
          </Stack>
        </Stack>
      </DetailContainer>
    </div>
  );
};

export default StoragePage;
