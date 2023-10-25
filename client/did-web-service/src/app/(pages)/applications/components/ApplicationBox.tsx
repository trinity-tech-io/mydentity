import { FC, useState } from "react";
import { Avatar, Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { TabContext, TabPanel } from "@mui/lab";
import { useBehaviorSubject } from "@hooks/useBehaviorSubject";
import { IdentityInteractingApplication } from "@model/identity-interacting-application/identity-interacting-application";
import { CardStyled } from "../../account/security/components/SecuritySection";
import DidTextfield from "../../developers/components/DidTextfield";
import { NormalButton } from "@components/button";
import CredentialBox from "./CredentialBox";

const StyledTabs = styled(Tabs)({
  background: "#a0a0a040",
  minHeight: "unset",
  borderRadius: ".25rem",
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingLeft: 16,
    paddingRight: 16,
  },
  "& .MuiTabs-indicatorSpan": {
    width: "100%",
    backgroundColor: "#9D3E3E",
  },
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  minHeight: "unset",
  paddingTop: 8,
  paddingBottom: 8,
  color: "rgba(255, 255, 255, 0.7)",
  "&.Mui-selected": {
    color: "#fff",
  },
  "&.Mui-focusVisible": {
    backgroundColor: "rgba(100, 95, 228, 0.32)",
  },
}));

const ApplicationBox: FC<{ application: IdentityInteractingApplication }> = ({
  application,
}) => {
  const [credentialsVisible, setCredentialsVisible] = useState(false);
  const [tabValue, setTabValue] = useState("1");
  const [appName] = useBehaviorSubject(
    application?.interactingApplication?.name$
  );
  const [appIcon] = useBehaviorSubject(
    application?.interactingApplication?.icon$
  );
  const [requestedCredentials] = useBehaviorSubject(
    application?.requestedCredentials$
  );
  const [importedCredentials] = useBehaviorSubject(
    application?.importedCredentials$
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string): void => {
    setTabValue(newValue);
  };

  const showCredentials = (): void => {
    setCredentialsVisible(!credentialsVisible);
  };

  return (
    <CardStyled elevation={0}>
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
          <div>
            <NormalButton
              size="small"
              endIcon={
                credentialsVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />
              }
              onClick={showCredentials}
            >
              Show credentials
            </NormalButton>
          </div>
        </Stack>
        <DidTextfield
          value={application.interactingApplication.did}
          outerProps={{ readOnly: true }}
          inputProps={{ className: "opacity-80", style: { fontSize: 12 } }}
        />
        {credentialsVisible && (
          <div className="mt-4">
            <TabContext value={tabValue}>
              <StyledTabs
                value={tabValue}
                onChange={handleChange}
                TabIndicatorProps={{
                  children: <span className="MuiTabs-indicatorSpan" />,
                }}
                variant="fullWidth"
                centered
              >
                <StyledTab
                  value="1"
                  label={`${
                    requestedCredentials?.length || 0
                  } credential(s) shared to`}
                />
                <StyledTab
                  value="2"
                  label={`${
                    importedCredentials?.length || 0
                  } credential(s) received from`}
                />
              </StyledTabs>
              <TabPanel value="1">
                <Grid container spacing={2}>
                  {requestedCredentials.map((rc) => (
                    <Grid item xs={6} key={rc.id}>
                      <CredentialBox credential={rc.credential} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
              <TabPanel value="2">
                <Grid container spacing={2}>
                  {importedCredentials.map((cr) => (
                    <Grid item xs={6} key={cr.id}>
                      <CredentialBox credential={cr} />
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </TabContext>
          </div>
        )}
      </Box>
    </CardStyled>
  );
};

export default ApplicationBox;
