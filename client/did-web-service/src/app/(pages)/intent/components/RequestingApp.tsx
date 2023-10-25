import { LoadingCircle } from "@components/loading-cards/loading-circle/LoadingCircle";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { didDocumentService } from "@services/identity/diddocuments.service";
import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

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
      const applicationDocument = await didDocumentService.resolveDIDDocument(
        applicationDID
      );
      setLoaded(true);
      if (applicationDocument) {
        setRequestingAppIconUrl(
          await applicationDocument.getRepresentativeIcon()
        );
        setRequestingAppName(
          await applicationDocument.getRepresentativeOwnerName()
        );
      } else {
        setRequestingAppIconUrl(null);
        setRequestingAppName(null);
      }
    }
  };

  useEffect(() => {
    updateApplicationData();
  }, [applicationDID]);

  if (!loaded || !applicationDID)
    return (
      <div className="flex items-center justify-center">
        <LoadingCircle width={120} height={120} />
      </div>
    );

  return (
    <Stack className={className} justifyContent="center" alignItems="center" spacing={1.5}>
      <Stack justifyContent="center" alignItems="center" spacing={.5}>
        <Avatar sx={{ width: 96, height: 96 }}>
          {requestingAppIconUrl && (
            <Image src={requestingAppIconUrl} alt="" width={120} height={120} />
          )}
        </Avatar>
        <div>
          <Box className="rounded-[4px] text-[8px] px-2.5 py-1 inline-block text-white whitespace-nowrap bg-[#9291A5]">
            APPLICATION
          </Box>
        </div>
      </Stack>
      <Typography variant="h4">
        {requestingAppName}
      </Typography>
    </Stack>
  );
};
