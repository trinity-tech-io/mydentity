import { FC } from "react";
import { Avatar, MenuItem, Stack, Typography } from "@mui/material";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";

const CredentialInteractingApp: FC<{ app: IdentityInteractingApplication }> = ({
  app,
}) => {
  const application = app.interactingApplication;
  const [name] = useBehaviorSubject(application?.name$);
  const [icon] = useBehaviorSubject(application?.icon$);
  return (
    <MenuItem disableRipple={true} disableTouchRipple={true}>
      <Stack direction="row" spacing={2}>
        <Avatar src={icon} sx={{ width: 32, height: 32 }} />
        <Stack>
          <Typography variant="body2" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="caption" fontStyle="italic">
            {app.createdAt?.toLocaleString()}
          </Typography>
        </Stack>
      </Stack>
    </MenuItem>
  );
};
export default CredentialInteractingApp;
