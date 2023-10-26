import { Credential } from "@model/credential/credential";
import { Box, Typography } from "@mui/material";
import { JsonViewer } from "./JsonViewer";

interface Props {
  credential: Credential;
}

function CredentialBasicInfo(props: Props): JSX.Element {
  const { credential } = props;

  return (
    <Box>
      <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
        {credential.getDisplayableTitle()}
      </Typography>
      <Typography component="span" variant="body2" color="text.secondary" lineHeight={1.2}>
        {credential.getDisplayValue() && (
          <JsonViewer data={credential.getDisplayValue()} />
        )}
      </Typography>
    </Box>
  );
}

export default CredentialBasicInfo;
