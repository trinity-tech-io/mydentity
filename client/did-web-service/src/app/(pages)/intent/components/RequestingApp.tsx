import { FC, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import { LoadingApplicationProfile } from "@components/loading-skeleton";
import SkelTheme from "@components/loading-skeleton/SkelTheme";
import { didDocumentService } from "@services/identity/diddocuments.service";

export const RequestingApp: FC<{
  applicationDID: string;
  className?: string;
}> = ({ applicationDID, className }) => {
  const [requestingAppIconUrl, setRequestingAppIconUrl] =
    useState<string>(null);
  const [requestingAppName, setRequestingAppName] = useState<string>(null);
  const [loaded, setLoaded] = useState(false);

  const updateApplicationData = async (): Promise<void> => {
    if (applicationDID) {
      try {
        const applicationDocument = await didDocumentService.resolveDIDDocument(
          applicationDID
        );
        setLoaded(true);
        if (applicationDocument) {
          applicationDocument
            .getRepresentativeIcon()
            .then(setRequestingAppIconUrl)
            .catch((e) => {
              setRequestingAppIconUrl("");
            });
          applicationDocument
            .getRepresentativeOwnerName()
            .then(setRequestingAppName)
            .catch((e) => {
              setRequestingAppName("");
            });
        } else {
          setRequestingAppIconUrl(null);
          setRequestingAppName(null);
        }
      } catch (e) {
        setLoaded(true);
      }
    } else {
      setLoaded(true);
    }
  };

  useEffect(() => {
    updateApplicationData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationDID]);

  return loaded ? (
    <>
      {applicationDID ? (
        <Stack
          className={className}
          justifyContent="center"
          alignItems="center"
          spacing={1.5}
        >
          <Stack justifyContent="center" alignItems="center" spacing={0.5}>
            {requestingAppIconUrl != null ? (
              <Avatar sx={{ width: 88, height: 88 }}>
                {requestingAppIconUrl ? (
                  <Image
                    src={requestingAppIconUrl}
                    alt=""
                    width={120}
                    height={120}
                  />
                ) : (
                  <PhotoFilterIcon fontSize="large" />
                )}
              </Avatar>
            ) : (
              <SkelTheme>
                <Skeleton
                  width={88}
                  height={88}
                  circle={true}
                  containerClassName="leading-none"
                />
              </SkelTheme>
            )}
            <div>
              <Box className="rounded-[4px] text-[8px] px-2.5 py-1 inline-block text-white whitespace-nowrap bg-[#9291A5]">
                APPLICATION
              </Box>
            </div>
          </Stack>
          {requestingAppName ? (
            <Typography variant="h4">{requestingAppName}</Typography>
          ) : (
            <Typography variant="h4" color="text.secondary">
              Unknown application
            </Typography>
          )}
        </Stack>
      ) : (
        <>
          <Stack
            className={className}
            justifyContent="center"
            alignItems="center"
            spacing={1.5}
          >
            <Stack justifyContent="center" alignItems="center" spacing={0.5}>
              <Avatar sx={{ width: 88, height: 88 }}>
                <PhotoFilterIcon fontSize="large" />
              </Avatar>
              <div>
                <Box className="rounded-[4px] text-[8px] px-2.5 py-1 inline-block text-white whitespace-nowrap bg-[#9291A5]">
                  APPLICATION
                </Box>
              </div>
            </Stack>
            <Typography variant="h4" color="text.secondary">
              Unknown application
            </Typography>
          </Stack>
        </>
      )}
    </>
  ) : (
    <LoadingApplicationProfile />
  );
};
