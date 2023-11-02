import { FC, MouseEventHandler, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import DidTextfield from "@/app/(pages)/developers/components/DidTextfield";

const IdentityBox: FC<{
  application: IdentityInteractingApplication;
  id: string;
  expanded: boolean;
  setExpanded: any;
}> = ({ application, id, expanded, setExpanded }) => {
  const [appName] = useBehaviorSubject(
    application?.interactingApplication?.name$
  );
  const [appIcon] = useBehaviorSubject(
    application?.interactingApplication?.icon$
  );
  // const handleExpanding: MouseEventHandler<HTMLButtonElement> = (e): void => {
  //   e.stopPropagation();
  //   setExpanded((prevIDs: string[]) => {
  //     let tempIDs = [...prevIDs];
  //     const thisIndex = tempIDs.findIndex((_id) => _id === id);
  //     if (thisIndex < 0) {
  //       tempIDs.length != 1 ? tempIDs.push(id) : (tempIDs = [id]);
  //     } else tempIDs.splice(thisIndex, 1);
  //     return tempIDs;
  //   });
  // };

  return (
      <Box className="relative z-10 flex flex-col h-full p-4">
        <Stack direction="row" spacing={1.5} pb={1} alignItems="center">
          <Avatar sx={{ width: 32, height: 32 }}>
            {appIcon && <Image src={appIcon} alt="" width={32} height={32} />}
          </Avatar>
          <Stack flexGrow={1}>
            <Typography variant="body2" fontWeight={600}>
              {appName}
            </Typography>
            <Typography variant="caption" fontStyle="italic" fontSize={9}>
              {application?.createdAt.toLocaleString()}
            </Typography>
          </Stack>
          {/* <div>
            <NormalButton
              size="small"
              endIcon={
                expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              onClick={handleExpanding}
            >
              Show less
            </NormalButton>
          </div> */}
        </Stack>
        <DidTextfield
          value={application.interactingApplication.did}
          outerProps={{ readOnly: true }}
          inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
        />
      </Box>
  );
};

export default IdentityBox;
