import { LoadingCircle } from "@components/loading-cards/loading-circle/LoadingCircle";
import { Avatar, Stack, Typography } from "@mui/material";
import { didDocumentService } from "@services/identity/diddocuments.service";
import clsx from "clsx";
import Image from "next/image";
import { FC, useEffect, useState } from "react";

export const RequestingApp: FC<{
  applicationDID: string;
  className?: string;
}> = ({ applicationDID, className }) => {
  const [requestingAppIconUrl, setRequestingAppIconUrl] = useState<string>(null);
  const [requestingAppName, setRequestingAppName] = useState<string>(null);
  const [loaded, setLoaded] = useState(false);

  console.log(className)

  const updateApplicationData = async (): Promise<void> => {
    if (applicationDID) {
      const applicationDocument = await didDocumentService.resolveDIDDocument(applicationDID);
      setLoaded(true);
      if (applicationDocument) {
        setRequestingAppIconUrl(await applicationDocument.getRepresentativeIcon());
        setRequestingAppName(await applicationDocument.getRepresentativeOwnerName());
      }
      else {
        setRequestingAppIconUrl(null);
        setRequestingAppName(null);
      }
    }
  }

  useEffect(() => {
    updateApplicationData();
  }, [applicationDID]);

  if (!loaded || !applicationDID)
    return <div className="flex items-center justify-center">
      <LoadingCircle width={120} height={120} />
    </div>

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <Stack direction="row" justifyContent="center">
        <Avatar sx={{ width: 120, height: 120 }}  >
          {requestingAppIconUrl && <Image src={requestingAppIconUrl} alt="" width={120} height={120} />}
        </Avatar>
      </Stack>
      <Typography mt={1} fontWeight={600}>
        {requestingAppName}
      </Typography>
    </div>
  )
}